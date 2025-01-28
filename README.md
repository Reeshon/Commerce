# Three-tier Web App

This repository contains the Terraform deployed by the Jump Start Solution (JSS) titled [Three-tier web application](https://console.cloud.google.com/products/solutions/details/three-tier-web-app).
The source code for the web application (frontend and middleware) deployed by this JSS can be found at [github.com/GoogleCloudPlatform/deploystack-three-tier-app](https://github.com/GoogleCloudPlatform/deploystack-three-tier-app).

### Tagline
Create a web app using a three-tiered architecture

### Detailed
This solution quickly and securely creates a web app using a three-tiered architecture with a front end, middleware, and back end (PostgreSQL database).
You can choose whether to deploy your solution through the console directly or download as Terraform on GitHub to deploy later.

### Architecture
1. User requests are sent to the front end, which is deployed on Vercel to support high scalability applications.
2. The request then lands on the middle tier, which is the API layer that provides access to the backend. This middleware is deployed as serverless functions on Vercel.
3. The frequent requests are cached in Memorystore for Redis for serving the request fast in-memory. The response is then served back to the user.
4. For new requests from the users, Cloud SQL provides the backend as the database layer. The response is then served back to the user.
5. For DevOps, Vercel handles the continuous deployment from GitHub repositories.

## Documentation
- [Architecture Diagram](assets/three_tier_web_app_v4.svg)

## Usage

Basic usage of this module is as follows:

```hcl
module "three_tier_app" {
  source  = "terraform-google-modules/three-tier-app/google"
  version = "~> 0.1"

  project_id  = var.project_id
  region = "us-central1"
  zone = "us-central1-a"
}
```

Functional examples are included in the
[examples](./examples/) directory.

<!-- BEGINNING OF PRE-COMMIT-TERRAFORM DOCS HOOK -->
## Inputs

| Name            | Description                                                       | Type        | Default         | Required |
|-----------------|-------------------------------------------------------------------|-------------|-----------------|:--------:|
| database\_type  | Cloud SQL Database flavor, mysql or postgresql                    | `string`    | `"postgresql"`  | no       |
| deployment\_name| The name of this particular deployment, will get added as a prefix to most resources. | `string` | `"three-tier-app"` | no  |
| enable\_apis    | Whether or not to enable underlying apis in this solution.        | `string`    | `true`          | no       |
| labels          | A map of labels to apply to contained resources.                  | `map(string)`| `<pre>{<br>  "three-tier-app": true<br>}</pre>` | no |
| project\_id     | The project ID to deploy to                                       | `string`    | n/a             | yes      |
| region          | The Compute Region to deploy to                                   | `string`    | `"us-central1"` | no      |
| run\_roles\_list | The list of roles that run needs                                  | `list(string)`| `<pre>[<br>  "roles/cloudsql.instanceUser",<br>  "roles/cloudsql.client"<br>]</pre>` | no |
| zone            | The Compute Zone to deploy to                                     | `string`    | `"us-central1-a"` | no    |

## Outputs

| Name           | Description                                               |
|----------------|-----------------------------------------------------------|
| endpoint       | The url of the front end which we want to surface to the user |
| neos\_toc\_url  | The URL to launch the in-console tutorial for the Three Tier App solution |
| sqlservername  | The name of the database that we randomly generated.      |

<!-- END OF PRE-COMMIT-TERRAFORM DOCS HOOK -->

## Requirements

These sections describe requirements for using this module.

### Software

The following dependencies must be available:

- [Terraform][terraform] v0.13
- [Terraform Provider for GCP][terraform-provider-gcp] plugin v3.0

### Service Account

A service account with the following roles must be used to provision
the resources of this module:

- Storage Admin: `roles/storage.admin`

The [Project Factory module][project-factory-module] and the
[IAM module][iam-module] may be used in combination to provision a
service account with the necessary roles applied.

### APIs

A project with the following APIs enabled must be used to host the
resources of this module:

- Google Cloud Storage JSON API: `storage-api.googleapis.com`

The [Project Factory module][project-factory-module] can be used to
provision a project with the necessary APIs enabled.

## Deploying with Vercel and GitHub Pages

### 1. **Set Up GitHub Repository**

- Ensure your project is pushed to a GitHub repository.
- Navigate to your repository on GitHub.

### 2. **Connect Repository to Vercel**

- Go to [Vercel](https://vercel.com/) and sign in or create an account.
- Click on **"New Project"** and select your GitHub repository.
- Follow the prompts to import your project.

### 3. **Configure Vercel for Frontend and Backend**

- **Frontend:**
  - Vercel automatically detects your React frontend.
  - Ensure the build command is `npm run build` and the output directory is `build`.
  
- **Backend APIs (Serverless Functions):**
  - Move your backend API files to the `/api` directory in the root of your project.
    ```
    Commerce/
    ├── api/
    │   ├── products.js
    │   ├── cart.js
    │   ├── wishlist.js
    │   └── search.js
    ├── src/
    │   └── ...frontend files...
    ├── package.json
    ├── vercel.json
    └── ...other files...
    ```
  - Vercel treats files inside the `/api` directory as serverless functions.

### 4. **Update `vercel.json`**

- Ensure you have a `vercel.json` file in the root of your project to configure serverless functions.

```json
{
  "version": 2,
  "builds": [
    { "src": "api/*.js", "use": "@vercel/node" },
    { "src": "src/index.js", "use": "@vercel/node" },
    { "src": "src/**/*.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/api/products", "dest": "api/products.js" },
    { "src": "/api/cart", "dest": "api/cart.js" },
    { "src": "/api/wishlist", "dest": "api/wishlist.js" },
    { "src": "/api/search", "dest": "api/search.js" },
    { "src": "/(.*)", "dest": "src/index.js" }
  ]
}
```
