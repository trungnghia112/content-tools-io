// https://mikesukmanowsky.com/firebase-file-and-image-uploads/
/**
 * Parses a 'multipart/form-data' upload request
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
const path = require('path');
const os = require('os');
const fs = require('fs');

const WPAPI = require('wpapi');

// Node.js doesn't have a built-in multipart/form-data parsing library.
// Instead, we can use the 'busboy' library from NPM to parse these requests.
const Busboy = require('busboy');

exports.filesUpload = function(req: any, res: any, next: any) {
  if (req.method !== 'POST') {
    // Return a "method not allowed" error
    return res.status(405).end();
  }

  const busboy: any = new Busboy({headers: req.headers});
  const tmpdir: any = os.tmpdir();

  // This object will accumulate all the fields, keyed by their name
  const fields: any = {};

  // This object will accumulate all the uploaded files, keyed by their name.
  const uploads: any = {};

  // This code will process each non-file field in the form.
  busboy.on('field', (fieldname: any, val: any) => {
    /**
     *  TODO(developer): Process submitted field values here
     */
    // console.log(`Processed field ${fieldname}: ${val}.`);
    fields[fieldname] = val;
  });

  const fileWrites: any[] = [];

  // This code will process each file uploaded.
  busboy.on('file', (fieldname: any, file: any, filename: any) => {
    // Note: os.tmpdir() points to an in-memory file system on GCF
    // Thus, any files in it must fit in the instance's memory.
    // console.log(`Processed file ${filename}`);
    const filepath = path.join(tmpdir, filename);
    uploads[fieldname] = filepath;

    const writeStream: any = fs.createWriteStream(filepath);
    file.pipe(writeStream);

    // File was processed by Busboy; wait for it to be written.
    // Note: GCF may not persist saved files across invocations.
    // Persistent files must be kept in other locations
    // (such as Cloud Storage buckets).
    const promise = new Promise((resolve: any, reject: any) => {
      file.on('end', () => {
        writeStream.end();
      });
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
    fileWrites.push(promise);
  });

  // Triggered once all uploaded files are processed by Busboy.
  // We still need to wait for the disk writes (saves) to complete.
  busboy.on('finish', async () => {
    await Promise.all(fileWrites);
    req.uploads = uploads;

    /**
     * TODO(developer): Process saved files here
     */

    // console.log('fields:', fields);
    const url = req.query.url;
    const urlArr = url.split('/wp/');
    const endpoint = urlArr[0];

    try {
      const wp = new WPAPI({
        endpoint
      });
      const wpResponse = await wp.media()
        .setHeaders({
          Authorization: fields['headers.Authorization']
        })
        // Specify a path to the file you want to upload, or a Buffer
        .file(uploads.file)
        .create({
          title: fields.title || '',
          alt_text: fields.alt_text || '',
          caption: fields.caption || '',
          description: fields.description || ''
        });

      // console.log('wpResData:', wpResponse);
      req.response = wpResponse;

    } catch (err) {
      // console.log('err:', err);
      req.response = {error: err};
    }

    // console.log('----uploads----:', uploads);

    for (const file in uploads) {
      // req.files.push(uploads[file]);
      fs.unlinkSync(uploads[file]);
    }
    next();
  });

  busboy.end(req.rawBody);
};
