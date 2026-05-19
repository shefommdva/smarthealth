(function () {
    const footerMarkup = `
        <footer>
            <div>
                <h4>SmartHealth</h4>
                <p><a href="haqqimizda.htm" data-i18n="about">Haqqımızda</a></p>
                <p><a href="press.htm" data-i18n="press">Mətbuat</a></p>
                <p><a href="karyera.htm" data-i18n="careers">Karyera</a></p>
                <p><a href="contact.htm" data-i18n="contact">Əlaqə</a></p>
            </div>
            <div>
                <h4 data-i18n="explore">Kəşf et</h4>
                <p><a href="techizatci-resurslari.htm" data-i18n="providerResources">Provayder resursları</a></p>
                <p><a href="icma-standartlari.htm" data-i18n="communityGuidelines">İcma qaydaları</a></p>
                <p><a href="mexfilik-siyaseti.htm" data-i18n="privacy">Məlumat və məxfilik</a></p>
                <p><a href="yoxlanmis-reyler.htm" data-i18n="verifiedReviews">Yoxlanılmış rəylər</a></p>
            </div>
            <div>
                <h4 data-i18n="insuranceProviders">Sığorta təminatçıları</h4>
                <p><a href="providers.htm?insurance=Pa%C5%9Fa%20S%C4%B1%C4%9Forta">Paşa Sığorta</a></p>
                <p><a href="providers.htm?insurance=At%C9%99%C5%9Fgah">Atəşgah</a></p>
                <p><a href="providers.htm?insurance=Qala%20S%C4%B1%C4%9Forta">Qala S&#305;&#287;orta</a></p>
                <p><a href="providers.htm?insurance=Meqa%20S%C4%B1%C4%9Forta">Meqa S&#305;&#287;orta</a></p>
                <p><a href="providers.htm?insurance=%C4%B0cbari%20Tibbi%20S%C4%B1%C4%9Forta">&#304;cbari Tibbi S&#305;&#287;orta</a></p>
                <p><a href="providers.htm?insurance=Beyn%C9%99lxalq%20S%C4%B1%C4%9Forta">Beyn&#601;lxalq S&#305;&#287;orta</a></p>
            </div>
            <div>
                <h4 data-i18n="providerQuestion">Həkim və xidmət provayderisiniz?</h4>
                <p data-i18n="aiMobile">Süni intellekt əsaslı mobil köməkçinizi sınayın</p>
                <div class="footer-badges">
                    <a href="#" class="store-btn"><i class="fa-brands fa-apple"></i> <span data-i18n="appStore">App Store-dan yüklə</span></a>
                    <a href="#" class="store-btn google"><i class="fa-brands fa-google-play"></i> <span data-i18n="googlePlay">Google Play-də əldə et</span></a>
                </div>
            </div>
        </footer>
        <div class="footer-bottom">
            <div class="footer-legal" data-i18n="legal">Burada və SmartHealth saytında, həmçinin mobil tətbiqində təqdim olunan məzmun yalnız ümumi məlumat məqsədlidir. Tibbi məsləhət yerinə istifadə edilə bilməz.</div>
            <div style="display:flex;align-items:center;gap:18px;">
                <div>&copy; 2026 SmartHealth, Inc.</div>
                <div class="footer-social">
                    <i class="fa-brands fa-twitter"></i>
                    <i class="fa-brands fa-facebook"></i>
                    <i class="fa-brands fa-linkedin"></i>
                </div>
            </div>
        </div>
    `;

    function ensureStylesheet(href) {
        const normalizedHref = href.replace(/^\.\//, '');
        const hasStylesheet = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).some(link => {
            const attr = (link.getAttribute('href') || '').replace(/^\.\//, '');
            return attr === normalizedHref || attr.endsWith('/' + normalizedHref);
        });
        if (hasStylesheet) return;

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }

    function renderSiteFooter() {
        ensureStylesheet('assets/site-footer.css');

        const template = document.createElement('template');
        template.innerHTML = footerMarkup.trim();

        const existingFooter = document.querySelector('footer');
        const existingFooterBottom = document.querySelector('.footer-bottom');
        if (existingFooterBottom) existingFooterBottom.remove();

        if (existingFooter) {
            existingFooter.replaceWith(template.content);
            if (window.SmartHealthGlobal) window.SmartHealthGlobal.translate();
            return;
        }

        document.body.appendChild(template.content);
        if (window.SmartHealthGlobal) window.SmartHealthGlobal.translate();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderSiteFooter);
    } else {
        renderSiteFooter();
    }
}());
