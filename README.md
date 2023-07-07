# slow.fyi

A simple website to help in communicating the _lack_ of urgency in a digital message.

Much like [email debt forgiveness day](https://gimletmedia.com/shows/reply-all/posts/edfd), the simple website at [slow.fyi](https://slow.fyi) aims to make communicating online a little less stressful.

> ## Take _your_ time
>
> The internet lets us communicate extremely fast, and with that has grown the expectation of a fast response.
>
> In today's stressful world, friends may want to reach out to friends without making them feel like they owe a fast reply.
>
> Ending any message with "[slow.fyi](https://slow.fyi)" does just that, because it brings them here<sup>1</sup>, where they can read this message and know a reply is appreciated, not expected.
>
> Enjoy the internet a little slower today.<br/>
> [slow.fyi](https://slow.fyi)

<sup>1</sup> Well not actually _here_, to this repo, but to [slow.fyi](https://slow.fyi) where this message lives.

## Build & deploy

This static website is hosted with [IPFS](https://ipfs.io), pinned by [Filebase](https://filebase.com), and fronted by [Cloudflare](https://www.cloudflare-ipfs.com). IPFS is a distributed network, so anyone can help to host by running:

```
$ ipfs pin add /ipns/www.slow.fyi
```

A merge to the master branch of this repo will trigger a Github Action that will:

1. Compile the site
2. Pin the resulting IPFS multihash to filebase.com
3. Update Cloudflare's DNS entry to point to the new hash

_Please note, the site is hosted at www.slow.fyi, rather than slow.fyi, so that I can use `CNAME` records to point to Cloudflare's IPFS gateway and have other DNS records._
