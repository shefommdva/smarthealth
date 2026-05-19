(function () {
    const STORAGE = {
        theme: 'smarthealth-theme',
        lang: 'smarthealth-lang',
        cookies: 'smarthealth-cookie-consent',
        geminiKey: 'smarthealth-gemini-api-key',
        chatHistory: 'smarthealth-chat-history'
    };

    const defaultLang = localStorage.getItem(STORAGE.lang) || 'az';
    const defaultTheme = localStorage.getItem(STORAGE.theme) || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = defaultTheme;
    document.documentElement.dataset.lang = defaultLang;

    const i18n = {
        az: {
            browse: 'Baxış',
            popular: 'Populyar ixtisaslar',
            more: 'Daha çox',
            procedures: 'Proseduralar',
            dentist: 'Stomatoloq',
            cardiologist: 'Kardioloq',
            pediatrician: 'Pediatr',
            ophthalmologist: 'Oftalmoloq',
            neurologist: 'Nevroloq',
            therapist: 'Terapevt',
            dermatologist: 'Dermatoloq',
            ent: 'LOR həkimi',
            allDoctors: 'Bütün həkimləri gör',
            clinics: 'Klinikaya görə axtar',
            insuranceProviders: 'Sığorta provayderləri',
            helpCenter: 'Kömək mərkəzi',
            providerResources: 'Provayder resursları',
            help: 'Kömək',
            partnerPortal: 'Partner portal',
            loginMenu: 'Daxil ol',
            personal: 'Fərdi',
            doctors: 'Həkimlər',
            clinicsMenu: 'Klinikalar',
            insuranceMenu: 'Sığorta',
            signup: 'Qeydiyyat',
            themeLight: 'İşıqlı rejim',
            themeDark: 'Qaranlıq rejim',
            language: 'Dil',
            chatbotOpen: 'Çatı aç',
            chatbotTitle: 'SmartHealth köməkçisi',
            chatbotIntro: 'Salam! Həkim tapmaq, rezervasiya və sığorta suallarında kömək edə bilərəm.',
            chatbotPlaceholder: 'Sualınızı yazın...',
            chatbotSend: 'Göndər',
            chatbotKeyTitle: 'Gemini API açarı lazımdır',
            chatbotKeyText: 'Bu statik demo üçün açarı brauzerdə saxlayıram. Canlı saytda açarı server proxy-də qoruyun.',
            chatbotKeyPlaceholder: 'Gemini API key',
            chatbotSaveKey: 'Yadda saxla',
            chatbotClearKey: 'Açarı sil',
            chatbotThinking: 'Cavab hazırlanır...',
            chatbotError: 'Bağışlayın, hazırda cavab ala bilmədim. API açarını və internet bağlantısını yoxlayın.',
            cookiesTitle: 'Cookie seçimi',
            cookiesText: 'Təcrübəni yaxşılaşdırmaq, dil və tema seçiminizi yadda saxlamaq üçün cookie/localStorage istifadə edirik.',
            cookiesAccept: 'Qəbul edirəm',
            cookiesDecline: 'İmtina edirəm',
            loading: 'Yüklənir',
            about: 'Haqqımızda',
            press: 'Mətbuat',
            careers: 'Karyera',
            contact: 'Əlaqə',
            explore: 'Kəşf et',
            communityGuidelines: 'İcma qaydaları',
            privacy: 'Məlumat və məxfilik',
            verifiedReviews: 'Yoxlanılmış rəylər',
            providerQuestion: 'Həkim və xidmət provayderisiniz?',
            aiMobile: 'Süni intellekt əsaslı mobil köməkçinizi sınayın',
            appStore: 'App Store-dan yüklə',
            googlePlay: 'Google Play-də əldə et',
            legal: 'Burada və SmartHealth saytında, həmçinin mobil tətbiqində təqdim olunan məzmun yalnız ümumi məlumat məqsədlidir. Tibbi məsləhət yerinə istifadə edilə bilməz.'
        },
        en: {
            browse: 'Browse',
            popular: 'Popular specialties',
            more: 'More',
            procedures: 'Procedures',
            dentist: 'Dentist',
            cardiologist: 'Cardiologist',
            pediatrician: 'Pediatrician',
            ophthalmologist: 'Ophthalmologist',
            neurologist: 'Neurologist',
            therapist: 'Therapist',
            dermatologist: 'Dermatologist',
            ent: 'ENT doctor',
            allDoctors: 'See all doctors',
            clinics: 'Search by clinic',
            insuranceProviders: 'Insurance providers',
            helpCenter: 'Help center',
            providerResources: 'Provider resources',
            help: 'Help',
            partnerPortal: 'Partner portal',
            loginMenu: 'Log in',
            personal: 'Personal',
            doctors: 'Doctors',
            clinicsMenu: 'Clinics',
            insuranceMenu: 'Insurance',
            signup: 'Sign up',
            themeLight: 'Light mode',
            themeDark: 'Dark mode',
            language: 'Language',
            chatbotOpen: 'Open chat',
            chatbotTitle: 'SmartHealth assistant',
            chatbotIntro: 'Hi! I can help with finding doctors, reservations, and insurance questions.',
            chatbotPlaceholder: 'Type your question...',
            chatbotSend: 'Send',
            chatbotKeyTitle: 'Gemini API key needed',
            chatbotKeyText: 'For this static demo, the key is stored in your browser. In production, protect it behind a server proxy.',
            chatbotKeyPlaceholder: 'Gemini API key',
            chatbotSaveKey: 'Save',
            chatbotClearKey: 'Remove key',
            chatbotThinking: 'Preparing an answer...',
            chatbotError: 'Sorry, I could not get a response right now. Check the API key and your internet connection.',
            cookiesTitle: 'Cookie choice',
            cookiesText: 'We use cookies/localStorage to improve the experience and remember your language and theme.',
            cookiesAccept: 'Accept',
            cookiesDecline: 'Decline',
            loading: 'Loading',
            about: 'About us',
            press: 'Press',
            careers: 'Careers',
            contact: 'Contact',
            explore: 'Explore',
            communityGuidelines: 'Community guidelines',
            privacy: 'Data and privacy',
            verifiedReviews: 'Verified reviews',
            providerQuestion: 'Are you a doctor or service provider?',
            aiMobile: 'Try your AI-powered mobile assistant',
            appStore: 'Download on the App Store',
            googlePlay: 'Get it on Google Play',
            legal: 'Content on SmartHealth and its mobile app is for general information only and should not be used as medical advice.'
        },
        ru: {
            browse: 'Обзор',
            popular: 'Популярные специальности',
            more: 'Еще',
            procedures: 'Разделы',
            dentist: 'Стоматолог',
            cardiologist: 'Кардиолог',
            pediatrician: 'Педиатр',
            ophthalmologist: 'Офтальмолог',
            neurologist: 'Невролог',
            therapist: 'Терапевт',
            dermatologist: 'Дерматолог',
            ent: 'ЛОР врач',
            allDoctors: 'Все врачи',
            clinics: 'Поиск по клинике',
            insuranceProviders: 'Страховые провайдеры',
            helpCenter: 'Центр помощи',
            providerResources: 'Ресурсы провайдера',
            help: 'Помощь',
            partnerPortal: 'Партнерский портал',
            loginMenu: 'Войти',
            personal: 'Пациент',
            doctors: 'Врачи',
            clinicsMenu: 'Клиники',
            insuranceMenu: 'Страхование',
            signup: 'Регистрация',
            themeLight: 'Светлая тема',
            themeDark: 'Темная тема',
            language: 'Язык',
            chatbotOpen: 'Открыть чат',
            chatbotTitle: 'Помощник SmartHealth',
            chatbotIntro: 'Здравствуйте! Я помогу с поиском врачей, записью и вопросами страхования.',
            chatbotPlaceholder: 'Введите вопрос...',
            chatbotSend: 'Отправить',
            chatbotKeyTitle: 'Нужен Gemini API ключ',
            chatbotKeyText: 'Для статического демо ключ хранится в браузере. В продакшене защитите его через серверный прокси.',
            chatbotKeyPlaceholder: 'Gemini API ключ',
            chatbotSaveKey: 'Сохранить',
            chatbotClearKey: 'Удалить ключ',
            chatbotThinking: 'Готовлю ответ...',
            chatbotError: 'Не удалось получить ответ. Проверьте API ключ и интернет-соединение.',
            cookiesTitle: 'Выбор cookie',
            cookiesText: 'Мы используем cookies/localStorage, чтобы улучшить сайт и запомнить язык и тему.',
            cookiesAccept: 'Принять',
            cookiesDecline: 'Отклонить',
            loading: 'Загрузка',
            about: 'О нас',
            press: 'Пресса',
            careers: 'Карьера',
            contact: 'Контакты',
            explore: 'Разделы',
            communityGuidelines: 'Правила сообщества',
            privacy: 'Данные и конфиденциальность',
            verifiedReviews: 'Проверенные отзывы',
            providerQuestion: 'Вы врач или поставщик услуг?',
            aiMobile: 'Попробуйте мобильного AI-помощника',
            appStore: 'Скачать в App Store',
            googlePlay: 'Доступно в Google Play',
            legal: 'Материалы SmartHealth и мобильного приложения предназначены только для общей информации и не заменяют медицинскую консультацию.'
        }
    };

    const pageDictionary = {
        'Tam Tibbi Platforma': { en: 'Complete Medical Platform', ru: 'Полная медицинская платформа' },
        'Həkim tapın və görüş təyin edin': { en: 'Find a doctor and book a visit', ru: 'Найдите врача и запишитесь на прием' },
        'Axtar': { en: 'Search', ru: 'Поиск' },
        'Əlaqə': { en: 'Contact', ru: 'Контакты' },
        'Haqqımızda': { en: 'About us', ru: 'О нас' },
        'Mətbuat': { en: 'Press', ru: 'Пресса' },
        'Karyera': { en: 'Careers', ru: 'Карьера' },
        'Kəşf et': { en: 'Explore', ru: 'Разделы' },
        'Məlumat və məxfilik': { en: 'Data and privacy', ru: 'Данные и конфиденциальность' },
        'Yoxlanılmış rəylər': { en: 'Verified reviews', ru: 'Проверенные отзывы' },
        'Həkim və xidmət provayderisiniz?': { en: 'Are you a doctor or service provider?', ru: 'Вы врач или поставщик услуг?' },
        'Süni intellekt əsaslı mobil köməkçinizi sınayın': { en: 'Try your AI-powered mobile assistant', ru: 'Попробуйте мобильного AI-помощника' },
        'App Store-dan yüklə': { en: 'Download on the App Store', ru: 'Скачать в App Store' },
        'Google Play-də əldə et': { en: 'Get it on Google Play', ru: 'Доступно в Google Play' }
    };

    const headerMarkup = `
        <header class="site-header">
            <a href="homepage.htm" class="site-logo"><i class="fa-solid fa-staff-snake"></i> SmartHealth</a>
            <button class="site-nav-toggle" type="button" aria-label="Menyunu aç"><i class="fa-solid fa-bars"></i></button>
            <nav class="site-nav" aria-label="&#399;sas menyu">
                <div class="site-dropdown">
                    <button class="site-dropdown-toggle" type="button"><span data-i18n="browse">Baxış</span> <i class="fa-solid fa-chevron-down"></i></button>
                    <div class="site-dropdown-menu site-browse-menu">
                        <div class="site-browse-column">
                            <h3 data-i18n="popular">Populyar ixtisaslar</h3>
                            <a href="search-results.htm?specialty=stomatology" data-i18n="dentist">Stomatoloq</a>
                            <a href="search-results.htm?specialty=cardiology" data-i18n="cardiologist">Kardioloq</a>
                            <a href="search-results.htm?specialty=pediatrics" data-i18n="pediatrician">Pediatr</a>
                            <a href="search-results.htm?specialty=ophthalmology" data-i18n="ophthalmologist">Oftalmoloq</a>
                        </div>
                        <div class="site-browse-column">
                            <h3 data-i18n="more">Daha çox</h3>
                            <a href="search-results.htm?specialty=neurology" data-i18n="neurologist">Nevroloq</a>
                            <a href="search-results.htm?specialty=therapy" data-i18n="therapist">Terapevt</a>
                            <a href="search-results.htm?specialty=dermatology" data-i18n="dermatologist">Dermatoloq</a>
                            <a href="search-results.htm?specialty=ent" data-i18n="ent">LOR həkimi</a>
                        </div>
                        <div class="site-browse-column">
                            <h3 data-i18n="procedures">Proseduralar</h3>
                            <a href="search-results.htm" data-i18n="allDoctors">Bütün həkimləri gör</a>
                            <a href="clinics.htm" data-i18n="clinics">Klinikaya görə axtar</a>
                            <a href="providers.htm" data-i18n="insuranceProviders">Sığorta provayderləri</a>
                            <a href="help.htm" data-i18n="helpCenter">Kömək mərkəzi</a>
                            <a href="techizatci-resurslari.htm" data-i18n="providerResources">Provayder resursları</a>
                        </div>
                    </div>
                </div>
                <a class="site-nav-link" href="doctors.htm" data-i18n="doctors">Həkimlər</a>
                <a class="site-nav-link" href="clinics.htm" data-i18n="clinicsMenu">Klinikalar</a>
                <a class="site-nav-link" href="providers.htm" data-i18n="insuranceMenu">Sığorta</a>
                <a class="site-nav-link" href="help.htm" data-i18n="help">Kömək</a>
                <a class="site-nav-link" href="partner-portal.htm" data-i18n="partnerPortal">Partner portal</a>
                <div class="site-auth-actions">
                    <div class="site-dropdown site-login-dropdown">
                        <button class="site-dropdown-toggle site-login" type="button"><span data-i18n="loginMenu">Daxil ol</span> <i class="fa-solid fa-chevron-down"></i></button>
                        <div class="site-dropdown-menu">
                            <div class="site-menu-section">
                                <div class="site-menu-title" data-i18n="personal">Fərdi</div>
                                <a href="login.htm" class="site-menu-link" data-i18n="loginMenu">Daxil ol</a>
                            </div>
                            <div class="site-menu-section">
                                <div class="site-menu-title" data-i18n="doctors">Həkimlər</div>
                                <a href="doctor-login.htm" class="site-menu-link" data-i18n="loginMenu">Daxil ol</a>
                                <a href="doctor-register.htm" class="site-menu-link">Həkim qeydiyyatı</a>
                                <a href="doctor-kabinet.htm" class="site-menu-link">Həkim kabineti(Demo)</a>
                            </div>
                        </div>
                    </div>
                    <a class="site-signup" href="qeydiyyat.htm" data-i18n="signup">Qeydiyyat</a>
                </div>
            </nav>
        </header>
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

    function t(key) {
        const lang = localStorage.getItem(STORAGE.lang) || 'az';
        return (i18n[lang] && i18n[lang][key]) || i18n.az[key] || key;
    }

    function applyTranslations(root) {
        const scope = root || document;
        const lang = localStorage.getItem(STORAGE.lang) || 'az';
        document.documentElement.lang = lang;
        document.documentElement.dataset.lang = lang;

        scope.querySelectorAll('[data-i18n]').forEach(node => {
            node.textContent = t(node.dataset.i18n);
        });

        scope.querySelectorAll('[data-i18n-attr]').forEach(node => {
            node.dataset.i18nAttr.split(',').forEach(pair => {
                const parts = pair.split(':');
                if (parts.length === 2) node.setAttribute(parts[0].trim(), t(parts[1].trim()));
            });
        });

        document.querySelectorAll('body *:not(script):not(style):not(input):not(textarea):not(option)').forEach(node => {
            if (node.children.length || node.dataset.i18n || !node.textContent.trim()) return;
            if (!node.dataset.azText) node.dataset.azText = node.textContent.trim();
            const entry = pageDictionary[node.dataset.azText];
            node.textContent = lang === 'az' ? node.dataset.azText : (entry && entry[lang]) || node.dataset.azText;
        });
    }

    function applyTheme(theme) {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem(STORAGE.theme, theme);
    }

    window.SmartHealthGlobal = {
        translate: () => applyTranslations(document),
        theme: applyTheme,
        animatePage: setupMotionReveals
    };

    function setupMotionReveals(root) {
        const scope = root || document;
        const selectors = [
            '.hero > *',
            '.search-wrapper',
            '.section-padding > h2',
            '.section-padding > h3',
            '.spec-item',
            '.ins-box',
            '.why-choose-us > h2',
            '.why-card',
            '.app-promo > *',
            '.doctor-card',
            '.insurance-plan',
            '.search-header > *',
            '.filter-buttons',
            '.filters-section',
            '.doctor-item',
            '.map-container',
            '.content-section > h2',
            '.process-card',
            '.star-card',
            '.sample-review',
            '.faq-item',
            '.contact-card',
            '.location-card',
            '.category-card',
            '.resource-card',
            '.news-card',
            '.media-kit-card',
            '.clinic-card',
            '.stat-card',
            '.appointment-card',
            '.profile-section'
        ].join(',');

        const items = Array.from(scope.querySelectorAll(selectors)).filter(item => {
            if (item.closest('.site-header') || item.closest('.site-footer')) return false;
            return !item.classList.contains('motion-reveal');
        });

        items.forEach((item, index) => {
            item.classList.add('motion-reveal');
            item.classList.add(index % 3 === 0 ? 'from-left' : index % 3 === 1 ? 'from-right' : 'from-scale');
            item.style.setProperty('--motion-delay', `${Math.min(index % 6, 5) * 55}ms`);
        });

        if (!items.length) return;

        if (!('IntersectionObserver' in window)) {
            items.forEach(item => item.classList.add('is-visible'));
            return;
        }

        if (!window.smartHealthRevealObserver) {
            window.smartHealthRevealObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-visible');
                    window.smartHealthRevealObserver.unobserve(entry.target);
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        }

        items.forEach(item => window.smartHealthRevealObserver.observe(item));
    }

    function renderSiteNavbar() {
        ensureStylesheet('assets/site-navbar.css');
        ensureStylesheet('assets/site-footer.css');

        const existingHeader = document.querySelector('header.site-header, body > header:first-child');
        const existingIslandNav = document.querySelector('.island-nav-wrapper');

        if (document.querySelector('.site-header')) {
            applyTranslations(document);
            document.dispatchEvent(new CustomEvent('smarthealth:navbar-ready'));
            return;
        }

        const template = document.createElement('template');
        template.innerHTML = headerMarkup.trim();
        const newHeader = template.content.firstElementChild;
        const currentPage = decodeURIComponent((window.location.pathname.split('/').pop() || 'homepage.htm')).toLowerCase();

        newHeader.querySelectorAll('a[href]').forEach(link => {
            const target = link.getAttribute('href').split('?')[0].toLowerCase();
            if (target === currentPage || (!currentPage && target === 'homepage.htm')) {
                link.classList.add('active');
            }
        });

        if (existingIslandNav) {
            existingIslandNav.replaceWith(newHeader);
        } else if (existingHeader && existingHeader.querySelector('nav, .site-nav')) {
            existingHeader.replaceWith(newHeader);
        } else {
            document.body.prepend(newHeader);
        }

        if (document.querySelector('.search-interface, body > .search-container')) {
            document.body.classList.add('site-search-layout');
        }

        const header = document.querySelector('.site-header');
        const toggle = header.querySelector('.site-nav-toggle');
        toggle.addEventListener('click', () => header.classList.toggle('nav-open'));

        header.querySelectorAll('.site-dropdown-toggle').forEach(button => {
            button.addEventListener('click', event => {
                event.stopPropagation();
                const dropdown = button.closest('.site-dropdown');
                header.querySelectorAll('.site-dropdown.is-open').forEach(item => {
                    if (item !== dropdown) item.classList.remove('is-open');
                });
                dropdown.classList.toggle('is-open');
            });
        });

        document.addEventListener('click', event => {
            if (!event.target.closest('.site-header')) {
                header.classList.remove('nav-open');
                header.querySelectorAll('.site-dropdown.is-open').forEach(item => item.classList.remove('is-open'));
            }
        });

        applyTranslations(document);
        document.dispatchEvent(new CustomEvent('smarthealth:navbar-ready'));
    }

    function initNavbarScroll() {
        const header = document.querySelector('.site-header');
        if (!header) return;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    function renderGlobalLoader() {
        if (document.querySelector('.page-loader')) return;
        const loader = document.createElement('div');
        loader.className = 'page-loader is-active';
        loader.innerHTML = `<div class="page-loader-card"><span class="page-loader-spinner"></span><span data-i18n="loading">${t('loading')}</span></div>`;
        document.body.appendChild(loader);
        requestAnimationFrame(() => {
            window.setTimeout(() => loader.classList.remove('is-active'), 350);
        });

        document.addEventListener('click', event => {
            const link = event.target.closest('a[href]');
            if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const url = new URL(link.href, window.location.href);
            if (url.origin !== window.location.origin || link.target || link.getAttribute('href').startsWith('#')) return;
            loader.classList.add('is-active');
        });
    }

    function renderCookiePopup() {
        if (localStorage.getItem(STORAGE.cookies) || document.querySelector('.cookie-consent')) return;
        const popup = document.createElement('section');
        popup.className = 'cookie-consent';
        popup.setAttribute('aria-live', 'polite');
        popup.innerHTML = `
            <div>
                <strong data-i18n="cookiesTitle">${t('cookiesTitle')}</strong>
                <p data-i18n="cookiesText">${t('cookiesText')}</p>
            </div>
            <div class="cookie-actions">
                <button type="button" class="cookie-decline" data-choice="declined" data-i18n="cookiesDecline">${t('cookiesDecline')}</button>
                <button type="button" class="cookie-accept" data-choice="accepted" data-i18n="cookiesAccept">${t('cookiesAccept')}</button>
            </div>
        `;
        document.body.appendChild(popup);
        popup.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                localStorage.setItem(STORAGE.cookies, button.dataset.choice);
                popup.classList.add('is-leaving');
                window.setTimeout(() => popup.remove(), 220);
            });
        });
    }

    function getChatHistory() {
        try {
            return JSON.parse(sessionStorage.getItem(STORAGE.chatHistory) || '[]');
        } catch (error) {
            return [];
        }
    }

    function saveChatHistory(history) {
        sessionStorage.setItem(STORAGE.chatHistory, JSON.stringify(history.slice(-12)));
    }

    function appendMessage(container, role, text) {
        const bubble = document.createElement('div');
        bubble.className = `chat-message ${role}`;
        bubble.textContent = text;
        container.appendChild(bubble);
        container.scrollTop = container.scrollHeight;
        return bubble;
    }

    async function askGemini(message) {
        const key = localStorage.getItem(STORAGE.geminiKey);
        if (!key) throw new Error('missing-key');
        const history = getChatHistory();
        const contents = history.concat([{ role: 'user', parts: [{ text: message }] }]);
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': key
            },
            body: JSON.stringify({
                contents,
                systemInstruction: {
                    parts: [{
                        text: 'You are SmartHealth assistant. Answer in the user selected language. Help with booking doctors, clinics, insurance, and general health navigation. Do not give diagnosis; recommend professional medical care for symptoms or emergencies.'
                    }]
                },
                generationConfig: {
                    temperature: 0.6,
                    maxOutputTokens: 500
                }
            })
        });

        if (!response.ok) throw new Error('gemini-error');
        const data = await response.json();
        const text = data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts
            ? data.candidates[0].content.parts.map(part => part.text || '').join('\n').trim()
            : '';
        if (!text) throw new Error('empty-response');
        saveChatHistory(contents.concat([{ role: 'model', parts: [{ text }] }]));
        return text;
    }

    function renderChatbot() {
        if (document.querySelector('.chatbot-shell')) return;
        const shell = document.createElement('div');
        shell.className = 'chatbot-shell';
        shell.innerHTML = `
            <button class="chatbot-fab" type="button" aria-label="${t('chatbotOpen')}" data-i18n-attr="aria-label:chatbotOpen"><i class="fa-solid fa-comment-medical"></i></button>
            <section class="chatbot-panel" aria-label="${t('chatbotTitle')}" data-i18n-attr="aria-label:chatbotTitle">
                <header class="chatbot-header">
                    <strong data-i18n="chatbotTitle">${t('chatbotTitle')}</strong>
                    <button class="chatbot-close" type="button" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
                </header>
                <div class="chatbot-key">
                </div>
                <div class="chatbot-messages"></div>
                <form class="chatbot-form">
                    <input type="text" autocomplete="off" data-i18n-attr="placeholder:chatbotPlaceholder" placeholder="${t('chatbotPlaceholder')}">
                    <button type="submit" data-i18n="chatbotSend">${t('chatbotSend')}</button>
                </form>
                <button class="chatbot-clear-key" type="button" data-i18n="chatbotClearKey">${t('chatbotClearKey')}</button>
            </section>
        `;
        document.body.appendChild(shell);

        const panel = shell.querySelector('.chatbot-panel');
        const messages = shell.querySelector('.chatbot-messages');
        const form = shell.querySelector('.chatbot-form');
        const input = form.querySelector('input');
        const keyBox = shell.querySelector('.chatbot-key');
        const keyInput = keyBox.querySelector('input');

        appendMessage(messages, 'bot', t('chatbotIntro'));
        getChatHistory().forEach(item => {
            const text = item.parts.map(part => part.text || '').join('\n');
            appendMessage(messages, item.role === 'user' ? 'user' : 'bot', text);
        });

        function syncKeyBox() {
            keyBox.style.display = localStorage.getItem(STORAGE.geminiKey) ? 'none' : 'block';
        }

        shell.querySelector('.chatbot-fab').addEventListener('click', () => {
            panel.classList.toggle('is-open');
            if (panel.classList.contains('is-open')) input.focus();
        });
        shell.querySelector('.chatbot-close').addEventListener('click', () => panel.classList.remove('is-open'));
        keyBox.querySelector('button').addEventListener('click', () => {
            if (!keyInput.value.trim()) return;
            localStorage.setItem(STORAGE.geminiKey, keyInput.value.trim());
            keyInput.value = '';
            syncKeyBox();
        });
        shell.querySelector('.chatbot-clear-key').addEventListener('click', () => {
            localStorage.removeItem(STORAGE.geminiKey);
            syncKeyBox();
        });
        form.addEventListener('submit', async event => {
            event.preventDefault();
            const message = input.value.trim();
            if (!message) return;
            input.value = '';
            appendMessage(messages, 'user', message);
            const thinking = appendMessage(messages, 'bot is-thinking', t('chatbotThinking'));
            try {
                thinking.textContent = await askGemini(message);
                thinking.classList.remove('is-thinking');
            } catch (error) {
                thinking.textContent = error.message === 'missing-key' ? t('chatbotKeyTitle') : t('chatbotError');
                thinking.classList.remove('is-thinking');
                syncKeyBox();
            }
        });
        syncKeyBox();
    }

    function bootGlobalFeatures() {
        renderGlobalLoader();
        renderCookiePopup();
        renderChatbot();
        initNavbarScroll();
        applyTranslations(document);
        setupMotionReveals(document);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            renderSiteNavbar();
            bootGlobalFeatures();
        });
    } else {
        renderSiteNavbar();
        bootGlobalFeatures();
    }
}());
