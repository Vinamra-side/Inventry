# Zoho invoice import

This integration uses Zoho's REST API directly. It does not require a Codex,
ChatGPT, Zapier, or Zoho connector app.

## What happens

1. An invoice-created workflow in Zoho sends the invoice ID to this app.
2. The app validates the webhook secret.
3. The app refreshes its Zoho OAuth access token and fetches the complete
   invoice from Zoho.
4. Each Zoho line item is matched to a local catalog item by its saved Zoho
   item ID, or by an exact item-name match on the first import.
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

Generate the authorization URL for Zoho Inventory in India:

```powershell
python scripts/zoho_oauth_setup.py --region in --product inventory --redirect-uri "YOUR_EXACT_REDIRECT_URI"
```

Open the printed URL, approve access, and copy the `code` value from the
redirected browser URL. Exchange it immediately because grant codes expire:

```powershell
python scripts/zoho_oauth_setup.py --region in --product inventory --redirect-uri "YOUR_EXACT_REDIRECT_URI" --code "ONE_TIME_CODE"
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
ZOHO_API_BASE_URL=https://www.zohoapis.in/inventory/v1
```

Change both URLs for the Zoho account's data center. For Zoho Books, the same
service can be used by setting the API base URL to the matching `/books/v3`
endpoint and granting `ZohoBooks.invoices.READ` instead.

Never commit real client secrets, refresh tokens, or webhook secrets.

The organization ID appears in Zoho Inventory under **Manage Organizations**.
It can also be retrieved through Zoho's Organizations API.

## Zoho webhook

### 4. Create the invoice workflow

In Zoho Inventory, open **Settings → Automation → Workflow Rules**, create a
rule for the **Invoices** module that runs when an invoice is created, then add
a webhook action with:

- Method: `POST`
- URL: `https://YOUR_APP/api/integrations/zoho/invoices`
- Header: `X-Zoho-Webhook-Secret: YOUR_ZOHO_WEBHOOK_SECRET`
- JSON body: `{ "invoice_id": "${INVOICE_ID}" }`

Use Zoho's invoice-ID merge field in place of `${INVOICE_ID}`. The exact merge
field selector is shown by Zoho when configuring the workflow.

Before enabling the rule, ensure every Zoho invoice item has an identically
named local catalog item. The first successful import saves the Zoho item ID,
so later imports no longer depend on the name.

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
