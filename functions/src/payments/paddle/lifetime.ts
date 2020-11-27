// https://us-central1-rocketui-io.cloudfunctions.net/webApi/api/v1/payments/hook

import { db } from '../../core';

const cors = require('cors')({origin: true});

export const lifetime = (req: any, res: any) => {
  cors(req, res, async () => {
    const body = req.body;
    if (body.passthrough && typeof body.passthrough === 'string') {
      body.passthrough = JSON.parse(body.passthrough);
      if (typeof body.passthrough === 'string') {
        body.passthrough = JSON.parse(body.passthrough);
      }
      console.log(body);

      switch (body.alert_name) {
        // Subscription Alerts
        case 'subscription_created':
          console.log('subscription_created');
          break;
        case 'subscription_updated':
          console.log('subscription_updated');
          break;
        case 'subscription_cancelled':
          console.log('subscription_cancelled');
          break;
        case 'subscription_payment_succeeded':
          console.log('subscription_payment_succeeded');
          break;
        case 'subscription_payment_failed':
          console.log('subscription_payment_failed');
          break;
        case 'subscription_payment_refunded':
          console.log('subscription_payment_refunded');
          break;

        // One-off Purchase Alerts
        case 'payment_succeeded':
          console.log('payment_succeeded');
          if (body.passthrough && body.passthrough.uid) {
            const data = {
              state: 'active',
              trialFinished: true,
              trialOversIn: -1,
              plan: {
                usedLimits: {
                  projects: -1,
                  pages: -1
                  // workspaces: 1,
                  // topics: 0,
                  // members: 0,
                  // blogs: 0,
                  // automations: 0
                },
                name: body.product_name
              },
              next_bill_date: null,
              lifetime: true
            };

            await db.collection('users').doc(body.passthrough.uid).set(
              data
              , {merge: true});

            await db.collection('transactions').doc(body.checkout_id).set(body);
          }
          break;
        case 'payment_refunded':
          console.log('payment_refunded');
          break;
        case 'locker_processed':
          console.log('locker_processed');
          break;

        // Risk & Dispute Alerts
        case 'payment_dispute_created':
          console.log('payment_dispute_created');
          break;
        case 'payment_dispute_closed':
          console.log('payment_dispute_closed');
          break;
        case 'high_risk_transaction_created':
          console.log('high_risk_transaction_created');
          break;
        case 'high_risk_transaction_updated':
          console.log('high_risk_transaction_updated');
          break;

        // Payout Alerts
        case 'transfer_created':
          console.log('transfer_created');
          break;
        case 'transfer_paid':
          console.log('transfer_paid');
          break;

        // Audience Alerts
        case 'new_audience_member':
          console.log('new_audience_member');
          break;
        case 'update_audience_member':
          console.log('update_audience_member');
          break;

        // Manual Invoicing Alerts
        case 'invoice_paid':
          console.log('invoice_paid');
          break;
        case 'invoice_sent':
          console.log('invoice_sent');
          break;
      }

      res.send(body);
    }
  });
};
