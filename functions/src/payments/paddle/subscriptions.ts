// https://us-central1-rocketui-io.cloudfunctions.net/webApi/api/v1/payments/hook

import { db } from '../../core';

const cors = require('cors')({origin: true});

export const hook = (req: any, res: any) => {
  cors(req, res, async () => {
    const body = req.body;
    if (body.passthrough && typeof body.passthrough === 'string') {
      body.passthrough = JSON.parse(body.passthrough);
      if (typeof body.passthrough === 'string') {
        body.passthrough = JSON.parse(body.passthrough);
      }
      console.log(body.passthrough);

      switch (body.alert_name) {
        // Subscription Alerts
        case 'subscription_created':
          break;
        case 'subscription_updated':
          break;
        case 'subscription_cancelled':
          break;
        case 'subscription_payment_succeeded':
          if (body.passthrough && body.passthrough.uid) {
            const data = {
              state: 'active',
              trialFinished: true,
              trialOversIn: -1,
              plan: {
                usedLimits: {
                  // workspaces: 1,
                  // topics: 0,
                  // members: 0,
                  // blogs: 0,
                  // automations: 0,
                  projects: -1,
                  pages: -1
                },
                name: body.plan_name
              },
              next_bill_date: body.next_bill_date,
              lifetime: false
            };

            await db.collection('users').doc(body.passthrough.uid).set(
              data
              , {merge: true});

            await db.collection('transactions').doc(body.checkout_id).set(body);
          }
          break;
        case 'subscription_payment_failed':
          break;
        case 'subscription_payment_refunded':
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
          break;
        case 'locker_processed':
          break;

        // Risk & Dispute Alerts
        case 'payment_dispute_created':
          break;
        case 'payment_dispute_closed':
          break;
        case 'high_risk_transaction_created':
          break;
        case 'high_risk_transaction_updated':
          break;

        // Payout Alerts
        case 'transfer_created':
          break;
        case 'transfer_paid':
          break;

        // Audience Alerts
        case 'new_audience_member':
          break;
        case 'update_audience_member':
          break;

        // Manual Invoicing Alerts
        case 'invoice_paid':
          break;
        case 'invoice_sent':
          break;
      }

      res.send(body);
    }
  });
};
