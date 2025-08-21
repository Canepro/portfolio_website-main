# Terraform — Hello Azure

Tagline
Minimal, secure-by-default Terraform example that provisions an Azure Resource Group and Storage Account — ideal for learning remote state and CI validation.

Value proposition
Teaching-focused Terraform sample that shows safe defaults for Azure storage and a minimal CI pipeline for fmt/validate/plan.

Quick start
1. az login && az account set -s <subscription-id>
2. terraform init
3. terraform plan -var="resource_group_name=rg-hello-azure" -var="storage_account_name=sthello1234"
4. terraform apply -auto-approve -var="resource_group_name=rg-hello-azure" -var="storage_account_name=sthello1234"

Key features
- Creates Resource Group + Storage Account with secure defaults (HTTPS-only, minimum TLS level, public access disabled).
- Optional AzureRM backend configuration for remote state.
- Optional GitHub Actions for CI: terraform fmt, tflint, init, validate, plan on PR; manual apply for safety.
- Clear variables & outputs for integration into demos or downstream modules.

Tech stack
- Terraform (recommended >= 1.5)
- Azure CLI, AzureRM provider
- Optional: GitHub Actions for CI

Security & caveats
- No secrets in repo. Use AZURE_CREDENTIALS for CI authentication.
- Intended as a learning/demo example — review and adapt for production (RBAC, policies, network rules).

Useful links
- Repository: https://github.com/Canepro/tf-hello-azure
- Add a screenshot of created resources in Azure Portal to the portfolio.
