import { client } from './apollo-client.backend';
import gql from 'graphql-tag';
import { PlaylistPayload } from '../models';

export class PlaylistsBackend {
  async userPlaylists(): Promise<PlaylistPayload[]> {
    return client
      .query({
        query: gql`
          {
            userPlaylists(offset: 0, limit: 500) {
              photoUrl
              id
              title
              description
              PlaylistEntries {
                imageUrl
                userDisplayName
                description
                title
                id
              }
            }
          }
        `,
        fetchPolicy: 'network-only'
      })
      .then((data: any) => data.data)
      .then(({ userPlaylists }: any) => userPlaylists)
      .catch(e => console.error(e));
  }

  async createPlaylist(
    photoUrl: string,
    title: string,
    description: string
  ): Promise<string> {
    return client
      .mutate({
        mutation: gql`
        mutation {
          updatePlaylist(photoUrl: "${photoUrl}", title: "${title}", description: "${description}")
      }
      `
      })
      .then((data: any) => data.data)
      .then(({ updatePlaylist }: any) => updatePlaylist)
      .catch(e => console.error(e));
  }

  async removePlaylist(id: string): Promise<string> {
    return client
      .mutate({
        mutation: gql`
        mutation {
          removePlaylist(id: "${id}")
      }
      `
      })
      .then((data: any) => data.data)
      .then(({ removePlaylist }: any) => removePlaylist)
      .catch(e => console.error(e));
  }

  async addEntryToPlaylist(
    playlistId: string,
    entryId: string
  ): Promise<string> {
    return client
      .mutate({
        mutation: gql`
        mutation {
          updatePlaylist(action: "add", id: "${playlistId}", ids: "${entryId}")
      }
      `
      })
      .then((data: any) => data.data)
      .then(({ updatePlaylist }: any) => updatePlaylist)
      .catch(e => console.error(e));
  }

  async removeEntryFromPlaylist(
    playlistId: string,
    entryId: string
  ): Promise<string> {
    return client
      .mutate({
        mutation: gql`
        mutation {
          updatePlaylist(action: "remove", id: "${playlistId}", ids: "${entryId}")
      }
      `
      })
      .then((data: any) => data.data)
      .then(({ updatePlaylist }: any) => updatePlaylist)
      .catch(e => console.error(e));
  }
}

export const playlistsBackend = new PlaylistsBackend();
