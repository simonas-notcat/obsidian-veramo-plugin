import { createAgent, TAgent } from '@veramo/core'
import { IDataStoreORM } from '@veramo/data-store'
import { AgentRestClient } from '@veramo/remote-client'

export const getRemoteAgent = (url: string, apiKey: string): TAgent<IDataStoreORM> => {
  return createAgent<IDataStoreORM>({
    plugins: [
      new AgentRestClient({
        url,
        headers: {
          'Authorization': 'Bearing ' + apiKey
        },
        enabledMethods: [
          'dataStoreORMGetIdentifiers',
          'dataStoreORMGetIdentifiersCount',
          'dataStoreORMGetMessages',
          'dataStoreORMGetMessagesCount',
          'dataStoreORMGetVerifiableCredentialsByClaims',
          'dataStoreORMGetVerifiableCredentialsByClaimsCount',
          'dataStoreORMGetVerifiableCredentials',
          'dataStoreORMGetVerifiableCredentialsCount',
          'dataStoreORMGetVerifiablePresentations',
          'dataStoreORMGetVerifiablePresentationsCount',
        ]
      })
    ]
  })
}