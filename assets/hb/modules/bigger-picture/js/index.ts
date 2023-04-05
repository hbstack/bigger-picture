import BiggerPicture from 'mods/bigger-picture/bigger-picture.umd.js'

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const bp = BiggerPicture({
            target: document.body,
        })

        const show = (img) => {
            bp.open({
                items: [img],
                intro: 'fadeup'
            })
        }

        const images = document.querySelectorAll('img')
        for (const img of images) {
            // ignore linkable images.
            if (img.parentElement?.closest('a')) {
                continue
            }

            img.addEventListener('click', () => {
                show({
                    img: img.getAttribute('data-src') ?? img.src,
                    height: img.getAttribute('data-height') ?? img.naturalHeight,
                    width: img.getAttribute('data-width') ?? img.naturalWidth,
                    alt: img.getAttribute('alt'),
                    caption: img.getAttribute('alt'),
                })
            })
        }

        const links = Array.from(document.querySelectorAll<HTMLElement>('.img-link'))
        for (const link of links) {
            link.addEventListener('click', (e) => {
                e.preventDefault()
                show({
                    img: link.getAttribute('href'),
                    alt: link.innerText,
                    caption: link.innerText,
                })
            })
        }
    })
})()
