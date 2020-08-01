const {
  PINATA_API_KEY,
  PINATA_API_SECRET,

  CLOUDFLARE_TOKEN,
  CLOUDFLARE_DNS_ZONE_ID,
  CLOUDFLARE_DNS_IDENTIFIER,

  GITHUB_RUN_ID,
} = process.env

const buildURL = `https://www.github.com/jphastings/slow.fyi/actions/runs/${GITHUB_RUN_ID}`

const path = require('path')
const pinata = require('@pinata/sdk')(PINATA_API_KEY, PINATA_API_SECRET)
const cloudflare = require('cloudflare')({ token: CLOUDFLARE_TOKEN })

build().then(pinataPin).then(cloudflareUpdate).catch(console.error)

async function build() {
  return path.join(__dirname, '..', '..', 'public')
}

async function pinataPin(rootPath) {
  const response = await pinata.pinFromFS(rootPath, {
    pinataMetadata: {
      name: 'slow.fyi',
      keyvalues: { buildURL }
    },
    pinataOptions: {
      cidVerson: 1,
      wrapWithDirectory: false,
    }
  })

  return response.IpfsHash
}

async function cloudflareUpdate(rootHash) {
  const txtRecord = `dnslink=/ipfs/${rootHash}`

  const opts = {
    type: 'TXT',
    name: `_dnslink.www.slow.fyi`,
    content: `dnslink=/ipfs/${rootHash}`,
    ttl: 1,
  }


  const response = await cloudflare.dnsRecords.edit(
    CLOUDFLARE_DNS_ZONE_ID,
    CLOUDFLARE_DNS_IDENTIFIER,
    opts
  )

  if (!response.success) {
    throw new Error("Failed to update Cloudflare: " + response.errors)
  }
}