# Portal Deployment Process

Our deployment process is structured around trunk-based development, with all code residing on the `main` branch. Deployments are categorized into following three environments

- Dev
- Staging
- Production

## Environments

### 1. Dev Environment (Testnet)

- **Purpose:** The dev environment is used for initial testing on `Testnet`.
- **Trigger:** Deployment to dev occurs automatically as soon as any code is merged into main.
- **Process:** Upon merging, the latest code is deployed to Dev, allowing developers to verify that the changes work as expected in a controlled environment.
- **Monitoring:** https://github.com/0xIntuition/intuition-ts/actions/workflows/deploy_dev.yml

### 2. Staging Environment (Mainnet)

- **Purpose:** Staging is a replica of the production environment, but it runs on `Mainnet`.
- **Trigger:** Similar to the dev environment, staging deployments are triggered by any merge to main.
- **Process:** Code is deployed to Mainnet in the staging environment to ensure that everything functions correctly under production-like conditions before the final release.
- **Monitoring:** https://github.com/0xIntuition/intuition-ts/actions/workflows/deploy_staging.yml

### 3. Production Environment (Mainnet)

- **Purpose:** The production environment is where the live application runs.
- **Trigger:** Production deployments are initiated manually by publishing a release via Github.
- **Process:** [Release Drafter](https://github.com/release-drafter/release-drafter) accumulates pull requests and code changes merged into main, creating a draft release. When ready, this draft published, triggering a deployment to production. A tag is then created, marking this as the latest release.
- **Monitoring:** https://github.com/0xIntuition/intuition-ts/actions/workflows/deploy_production.yml

## Deployment Flow

Here's a summary of a typical lifecycle in a sprint.

1. Code Merge: All code merges occur on the main branch, in line with trunk-based development practices.

2. Automatic Deployments: Both dev and staging environments receive automatic deployments upon each merge to main.

3. Release Drafting: Release Drafter continuously collects and organizes the changes from main into a draft release, serving as a potential release candidate.

4. Publishing to Production: When the team decides the application is ready for production, the draft release is reviewed, finalized, and published. This action triggers a deployment to production and creates a corresponding tag for the release.

## Benefits

- Continuous Integration: Ensures that all code changes are immediately tested in both testnet and mainnet environments.
- Controlled Releases: The use of a release drafter allows for careful review and timing of production deployments, reducing the risk of introducing bugs to the live environment.
- Consistency: Trunk-based development ensures that the main branch is always ready for deployment, simplifying the management of deployments across environments.

## Hotfix Workflow

1. **Branching for Hotfix**:
   A new branch is created from the latest stable main branch, typically named `hotfix/{issue-description}`. This ensures that the hotfix is isolated from ongoing development work.
2. **Implementing the Hotfix**:
   The necessary code changes are made directly in the hotfix branch. These changes should be minimal, targeting only the specific issue to avoid introducing new bugs or complications.
3. **Testing the Hotfix**:
   The hotfix branch is deployed to the staging environment for immediate testing. The testing process should be thorough but expedited to ensure the fix is effective without unnecessary delays.
4. **Merging and Deployment**:
   Once verified, the hotfix branch is merged directly into the main branch. This merge triggers an automatic deployment to the dev and staging environments to ensure the fix is integrated smoothly.
   The hotfix is then deployed to the production environment manually, following the same process as a regular release. This involves publishing a draft release, which includes the hotfix changes, and creating a tag to mark the release.
5. **Post-Deployment Verification**:
   After the hotfix is deployed to production, the system should be closely monitored to confirm that the issue has been resolved without introducing new problems.
   Any necessary follow-up actions, such as informing stakeholders or updating documentation, should be carried out immediately after the deployment.
