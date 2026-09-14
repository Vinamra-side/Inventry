# Zoho Billing invoice import

This integration uses Zoho's REST API directly. It does not require a Codex,
ChatGPT, Zapier, or Zoho connector app.

## What happens

An administrator can open **Orders → View Zoho invoices** to browse Zoho Billing's
invoice list and open the full invoice detail returned by the Zoho API. The
detail page includes every returned field in an expandable JSON section.
Simply viewing invoices does **not** create orders or deduct current stock.
An admin can select **Import to history** for one past invoice, **Import this
page** for the current 25-invoice page, or **Import all past invoices** to
process every Zoho page sequentially while the browser tab stays open.
Historical imports store every
invoice line, the invoice date/number, and the complete invoice JSON snapshot
in local order history without catalog matching or stock deductions. They are
idempotent by Zoho invoice ID; cancelled/void and current-day invoices are not
history-imported. For a current-day invoice, an admin can use **Import as order**
to create the active order immediately (with catalog matching and stock deduction)
if the webhook has not done so already. The webhook uses the same invoice ID and
will not create a duplicate later.
The invoice list works even if the Zoho webhook workflow has not fired. It
requires a working Zoho Billing refresh token, Billing
organization ID, and the `/billing/v1` API base.

For automatic order creation, the webhook workflow is still required:

1. An invoice-created workflow in Zoho sends the invoice ID to this app.
2. The app validates the webhook secret.
3. The app refreshes its Zoho OAuth access token and fetches the complete
   invoice from Zoho.
4. Each Billing `invoice_items` entry is matched to a local catalog item by
   its exact description, saved Billing item ID, or exact name. A Billing item
   ID is saved only when the name and description do not identify different
   variants; the old Books/Inventory item ID is kept separate.
5. One local multi-item order is created and stock is deducted atomically.
6. The Zoho invoice ID is saved on the order. Repeated webhook deliveries
   return the existing order instead of creating a duplicate.

Cancelled or void invoices are rejected. An invoice is also rejected if an
item cannot be matched or local stock is insufficient.

Zoho and local item quantities must use the same unit; this service does not
perform automatic unit conversion.

## Environment configuration

### 1. Create the OAuth client

1. Open the [Zoho API Console](https://api-console.zoho.com/).
2. Choose **Add Client** and create a **Server-based Application**.
3. Enter the deployed app URL as the homepage URL.
4. Add an authorized redirect URI. You can use a controlled HTTPS page because
   the included setup helper only needs the `code` query parameter Zoho sends
   to that URI. The value must be identical in every following command.
5. Copy the client ID and client secret into local environment variables. Do
   not place the real values in source-controlled files.

### 2. Generate the offline refresh token

In PowerShell, set the credentials for the current terminal session:

```powershell
$env:ZOHO_CLIENT_ID = "YOUR_CLIENT_ID"
$env:ZOHO_CLIENT_SECRET = "YOUR_CLIENT_SECRET"
```

Generate the authorization URL for Zoho Billing in India:

```powershell
python scripts/zoho_oauth_setup.py --region in --product billing --redirect-uri "YOUR_EXACT_REDIRECT_URI"
```

Open the printed URL, approve access, and copy the `code` value from the
redirected browser URL. Exchange it immediately because grant codes expire:

```powershell
python scripts/zoho_oauth_setup.py --region in --product billing --redirect-uri "YOUR_EXACT_REDIRECT_URI" --code "ONE_TIME_CODE"
```

The helper prints the refresh-token environment entry. Store it as a protected
secret in the deployment platform.

### 3. Add the server configuration

Configure these production server variables:

```text
ZOHO_CLIENT_ID=...
ZOHO_CLIENT_SECRET=...
ZOHO_REFRESH_TOKEN=...
ZOHO_ORGANIZATION_ID=...
ZOHO_WEBHOOK_SECRET=...
ZOHO_ACCOUNTS_URL=https://accounts.zoho.in
ZOHO_API_BASE_URL=https://www.zohoapis.in/billing/v1
```

Change both URLs for the Zoho account's data center. The refresh token must
have `ZohoSubscriptions.invoices.READ` scope; a token granted only Books or
Inventory scopes cannot read Billing invoices. Production environment variables
override the defaults in code and `.env.example`. In Vercel, replace the old
`/books/v3` or `/inventory/v1` setting and old refresh token, then redeploy.

Never commit real client secrets, refresh tokens, or webhook secrets.

Use the organization ID of the **same Zoho Billing organization** that contains
the invoices. It can be retrieved from Billing's Manage Organizations page or
`GET /billing/v1/organizations`. Do not assume a Books organization ID is the
same. Billing sends this ID in the `X-com-zoho-subscriptions-organizationid`
header, not the Books `organization_id` query parameter.

### If the invoice page returns HTTP 400

The admin invoice page now displays Zoho's error `code` and `message` when
available. Check that `ZOHO_API_BASE_URL` is the Billing v1 endpoint for the
account's data center, that `ZOHO_ORGANIZATION_ID` belongs to the Billing
organization with the invoices, and that the refresh token has the Billing
invoice read scope. A successful request is read-only; it does not import old
invoices or deduct stock. Do not share the client secret, refresh token, or
full authorization headers while troubleshooting.

## Zoho webhook

### 4. Create the invoice workflow

In Zoho Billing, open **Settings → Automation → Workflow Rules**, create a
rule for the **Invoices** module that runs when an invoice is created, then add
a webhook action with:

- Method: `POST`
- URL: `https://YOUR_APP/api/integrations/zoho/invoices`
- Header: `X-Zoho-Webhook-Secret: YOUR_ZOHO_WEBHOOK_SECRET`
- JSON body: `{ "invoice_id": "${INVOICE_ID}" }`

Use Zoho's invoice-ID merge field in place of `${INVOICE_ID}`. The exact merge
field selector is shown by Zoho when configuring the workflow.

Before enabling the rule, confirm catalog mappings and units for every Billing
invoice item. Generic names with variant descriptions and blends may need
explicit mapping/recipes; an unmatched line rejects the entire import.

Successful first import returns HTTP `201`. A retry of an already imported
invoice returns HTTP `200`. Configuration, Zoho API, item mapping, and stock
errors return a JSON error with an appropriate non-2xx status.

## Local dummy test

Install the project requirements, then run:

```powershell
python -m unittest tests.test_zoho_integration -v
```

The test suite uses dummy credentials and mocked Zoho responses. It makes no
network requests, does not need PostgreSQL, and verifies token refresh, invoice
fetching, multi-item conversion, retry idempotency, void rejection, webhook
authentication, and the Flask webhook response.
