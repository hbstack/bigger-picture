export default class Panel {
    constructor(
        private downloadIcon: string,
        private shareIcon: string,
        private rotateIcon: string,
    ) {

    }

    init(container: HTMLElement) {
        const p = document.createElement('div')
        p.classList.add('bp-panel', 'd-flex', 'position-absolute', 'mx-auto', 'start-0', 'end-0', 'text-center')
        p.appendChild(this.rotate(false))
        p.appendChild(this.rotate(true))
        p.appendChild(this.download())
        p.appendChild(this.share())
        container.appendChild(p)
    }

    update(container: HTMLElement, item) {
        const p = container.querySelector('.bp-panel') as HTMLElement

        // update download link.
        const d = p.querySelector('.bp-panel-download') as HTMLAnchorElement
        d.href = item.img
        d.download = item.alt
    }

    imgWrap = (): HTMLElement => {
        return document.querySelector('.bp-img-wrap') as HTMLElement
    }

    rotate = (clockwise = false): HTMLAnchorElement => {
        const wrap = this.imgWrap()
        const a = document.createElement('a')
        a.title = 'Rotate'
        a.role = 'button'
        a.classList.add('bp-panel-action', 'bp-panel-rotate', clockwise ? 'bp-panel-rotate-clockwise' : 'bp-panel-rotate-anticlockwise', 'text-decoration-none', 'p-2')
        a.innerHTML = this.rotateIcon
        a.addEventListener('click', () => {
            let value = parseInt(wrap.getAttribute('data-rotate') ?? '0')
            value += clockwise ? 90 : -90
            wrap.setAttribute('data-rotate', value.toString())
            this.transform()
        })
        return a
    }

    transform = () => {
        const wrap = this.imgWrap()

        const transform: Array<string> = []

        const rotate = wrap.getAttribute('data-rotate')
        if (rotate) {
            transform.push(`rotate(${parseInt(rotate)}deg)`)
        }

        wrap.style.transform = transform.join(" ")
    }

    download = (): HTMLAnchorElement => {
        const a = document.createElement('a')
        a.title = 'Download'
        a.role = 'button'
        a.classList.add('bp-panel-action', 'bp-panel-download', 'text-decoration-none', 'p-2')
        a.setAttribute('download', '')
        a.innerHTML = this.downloadIcon
        return a
    }

    twitterShareLink = () => {
        return `https://twitter.com/intent/tweet?url=${this.shareLink()}`
    }

    facebookShareLink = () => {
        return `https://www.facebook.com/sharer/sharer.php?u=${this.shareLink()}`
    }

    shareLink = () => {
        return encodeURIComponent(window.location.href)
    }

    share = () => {
        const el = document.createElement('div')
        el.classList.add('bp-panel-action', 'dropdown-center', 'bp-panel-share', 'p-2')
        el.innerHTML = `<a class="text-white" href="#" role="button" title="Share" data-bs-toggle="dropdown" aria-expanded="false">${this.shareIcon}</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" target="_blank" href="${this.twitterShareLink()}">Twitter</a></li>
            <li><a class="dropdown-item" target="_blank" href="${this.facebookShareLink()}">Facebook</a></li>
          </ul>`
        return el
    }
}
