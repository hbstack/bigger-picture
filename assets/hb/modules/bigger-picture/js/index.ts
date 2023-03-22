import BiggerPicture from 'mods/bigger-picture/bigger-picture.umd.js'

(() => {
    window.addEventListener('load', () => {
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
            if (img.parentElement?.tagName === 'A') {
                continue
            }

            img.addEventListener('click', () => {
                show({
                    img: img.src,
                    height: img.naturalHeight,
                    width: img.naturalWidth,
                })
            })
        }

        const links = document.querySelectorAll('.img-link')
        for (const link of links) {
            link.addEventListener('click', (e) => {
                e.preventDefault()
                show({
                    img: link.getAttribute('href'),
                })
            })
        }
    })
})()
