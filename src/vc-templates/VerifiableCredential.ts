import { UniqueVerifiableCredential } from "@veramo/data-store";
import { stringify } from 'yaml'

export const VerifiableCredential = (vc: UniqueVerifiableCredential): string => {
  const markdown = `---
${stringify(vc.verifiableCredential)}
---
#verifiable/credential
Issuer: [[${vc.verifiableCredential.issuer.id}]]
Issuance Date: ${vc.verifiableCredential.issuanceDate}
Type: [[${vc.verifiableCredential.type}]]
\`\`\`
${stringify(vc.verifiableCredential.credentialSubject)}
\`\`\`
`

return markdown
}