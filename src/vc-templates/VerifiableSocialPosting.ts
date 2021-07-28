import { UniqueVerifiableCredential } from "@veramo/data-store";
import { stringify } from 'yaml'

export const VerifiableSocialPosting = (vc: UniqueVerifiableCredential): string => {
  const markdown = `---
${stringify(vc.verifiableCredential)}
---
${vc.verifiableCredential.credentialSubject.articleBody}

![${vc.verifiableCredential.credentialSubject.author.name}|32](${vc.verifiableCredential.credentialSubject.author.image}) ${vc.verifiableCredential.credentialSubject.author.name} 
`

return markdown
}