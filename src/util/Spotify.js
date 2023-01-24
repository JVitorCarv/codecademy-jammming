import { clientIdInfo } from "./ClientID";
const clientId = clientIdInfo
const redirectUri = 'https://jamming-jvitorcarv.surge.sh/'
let accessToken

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1]
            const expiresIn = Number(expiresInMatch[1])
            window.setTimeout(() => accessToken = '', expiresIn * 1000)
            window.history.pushState('Access Token', null, '/')
            return accessToken
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
            window.location = accessUrl
        }
    },
    search(term) {
        const accessToken = Spotify.getAccessToken()
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
                    { headers: { Authorization: `Bearer ${accessToken}`} })
                .then(res => {
                    return res.json()})
                .then(json => {
                    if (!json.tracks) {
                        return []
                    }
                    return json.tracks.items.map(t => ({
                        id: t.id,
                        name: t.name,
                        artist: t.artists[0].name,
                        album: t.album.name,
                        uri: t.uri
                    }))
                })
    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
            return
        }

        const accessToken = Spotify.getAccessToken()
        const headerAuth = { Authorization: `Bearer ${accessToken}`}
        let userId

        return fetch(`https://api.spotify.com/v1/me`, { headers: headerAuth })
                .then(res => res.json())
                .then(json => {
                    userId = json.id
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
                    { headers: headerAuth, method: 'POST', body: JSON.stringify({name: name})})
                })
                .then(res => res.json())
                .then(json => {
                    const playlistId = json.id
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, 
                    {headers: headerAuth, method: 'POST', body: JSON.stringify({ uris: trackUris })})
                })
    }
}

export default Spotify