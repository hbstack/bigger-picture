export default class Panel {
    constructor(
        private downloadIcon: string,
        private shareIcon: string,
    ) {

    }

    init(container: HTMLElement) {
        const p = document.createElement('div')
        p.classList.add('bp-panel', 'd-flex', 'position-absolute', 'mx-auto', 'start-0', 'end-0', 'text-center')
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
