{{- $iconSize := "1.25em" }}
{{- $downloadIcon := partial "icons/icon" (dict "vendor" "bs" "name" "download" "width" $iconSize "height" $iconSize) }}
{{- $shareIcon := partial "icons/icon" (dict "vendor" "bs" "name" "share" "width" $iconSize "height" $iconSize) }}
{{- $rotateIcon := partial "icons/icon" (dict "vendor" "bs" "name" "arrow-clockwise" "width" $iconSize "height" $iconSize) }}
{{- $flipIcon := partial "icons/icon" (dict "vendor" "bs" "name" "phone-flip" "width" $iconSize "height" $iconSize) }}
{{- $playIcon := partial "icons/icon" (dict "vendor" "bs" "name" "play-circle" "width" $iconSize "height" $iconSize) }}
{{- $scale := default 2 site.Params.hb.bigger_picture.scale }}

import BiggerPicture from 'mods/bigger-picture/bigger-picture.umd.js'
import Panel from './panel'

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const bp = BiggerPicture({
            target: document.body,
        })

        const panel = new Panel(bp, `{{ $downloadIcon }}`, `{{ $shareIcon }}`, `{{ $rotateIcon }}`, `{{ $flipIcon }}`, `{{ $playIcon }}`)

        const onOpen = (container: HTMLElement) => {
            panel.init(container)
        }

        const onUpdate = (container: HTMLElement, item) => {
            panel.update(container, item)
        }

        const show = (imgs, pos) => {
            bp.open({
                items: imgs,
                intro: 'fadeup',
                position: pos,
                onOpen: onOpen,
                onUpdate: onUpdate,
            })
        }

        const scale = parseInt('{{ $scale }}')

        const data = (img: HTMLImageElement) => {
            const alt = img.getAttribute('alt')
            let caption = alt
            const captionEle = img.parentNode.querySelector('figcaption')
            if (captionEle !== null) {
                caption = captionEle.innerText
            }
            return {
                img: img.getAttribute('data-src') ?? img.src,
                height: scale * (img.getAttribute('data-height') ?? img.naturalHeight),
                width: scale * (img.getAttribute('data-width') ?? img.naturalWidth),
                alt: img.getAttribute('alt'),
                caption: caption,
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
