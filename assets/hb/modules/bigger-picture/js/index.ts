import BiggerPicture from 'mods/bigger-picture/bigger-picture.umd.js'

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const bp = BiggerPicture({
            target: document.body,
        })

        const panel = (container, item) => {
            const p = document.createElement('div')
            p.classList.add('bp-panel', 'position-absolute', 'mx-auto', 'start-0', 'end-0', 'text-center')

            p.appendChild(download(item.img, item.alt))

            container.querySelector('.bp-inner').appendChild(p)
        }

        const download = (url, name): HTMLAnchorElement => {
            const a =  document.createElement('a')
            a.href = url
            a.title = 'Download'
            a.role = 'button'
            a.classList.add('text-decoration-none', 'p-2')
            a.setAttribute('download', name)
            a.innerText = '💾'
            return a
        }

        const update = (container, item) => {
            panel(container, item)
        }

        const show = (imgs, pos) => {
            bp.open({
                items: imgs,
                intro: 'fadeup',
                position: pos,
                onUpdate: update,
            })
        }

        const data = (img: HTMLImageElement) => {
            return {
                img: img.getAttribute('data-src') ?? img.src,
                height: img.getAttribute('data-height') ?? img.naturalHeight,
                width: img.getAttribute('data-width') ?? img.naturalWidth,
                alt: img.getAttribute('alt'),
                caption: img.getAttribute('alt'),
                thumb: img.src,
            }
        }

        const images = document.querySelectorAll('img')
        for (const img of images) {
            // ignore linkable images.
            if (img.closest('a')) {
                continue
            }

            img.addEventListener('click', () => {
                const imgs: Array<unknown> = []
                let pos = 0
                const set = img.closest('.bigger-pictures')
                if (set) {
                    // display a set of images.
                    const els = set.querySelectorAll<HTMLImageElement>('img')
                    for (let i = 0; i < els.length; i++) {
                        if (els[i] === img) {
                            pos = i
                        }
                        imgs.push(data(els[i]))
                    }
                } else {
                    imgs.push(data(img))
                }

                show(imgs, pos)
            })
        }

        const links = Array.from(document.querySelectorAll<HTMLElement>('.img-link'))
        for (const link of links) {
            link.addEventListener('click', (e) => {
                e.preventDefault()
                show([{
                    img: link.getAttribute('href'),
                    alt: link.innerText,
                    caption: link.innerText,
                }], 0)
            })
        }
    })
})()
