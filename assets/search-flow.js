(function () {
    const savedStorageKey = 'smarthealth-saved-doctors';

    const specialtyMap = {
        stomatology: 'Stomatoloq',
        cardiology: 'Kardioloq',
        pediatrics: 'Pediatr',
        ophthalmology: 'Oftalmoloq',
        neurology: 'Nevroloq',
        therapy: 'Terapevt',
        dermatology: 'Dermatoloq',
        ent: 'LOR həkimi',
        urology: 'Uroloq cərrah',
        orthopedics: 'Ortoped',
        psychology: 'Psixoloq',
        physiotherapy: 'Fizioterapevt',
        genetics: 'Genetik',
        endocrinology: 'Endokrinoloq',
        gastroenterology: 'Qastroenteroloq'
    };

    function normalize(value) {
        return String(value || '').toLocaleLowerCase('az');
    }

    function doctorProfileUrl(doctor) {
        return `doctor-profile.htm?id=${encodeURIComponent(doctor.id)}`;
    }

    function reservationUrl(doctor) {
        return `reservation.htm?id=${encodeURIComponent(doctor.id)}`;
    }

    function getSavedDoctors() {
        try {
            return JSON.parse(localStorage.getItem(savedStorageKey) || '[]');
        } catch (error) {
            return [];
        }
    }

    function setSavedDoctors(ids) {
        localStorage.setItem(savedStorageKey, JSON.stringify(ids));
    }

    function isDoctorSaved(id) {
        return getSavedDoctors().includes(String(id));
    }

    window.toggleSavedDoctor = function (id, event) {
        if (event) event.preventDefault();
        const idValue = String(id);
        const saved = getSavedDoctors();
        const nextSaved = saved.includes(idValue) ? saved.filter(item => item !== idValue) : saved.concat(idValue);
        setSavedDoctors(nextSaved);
        renderDoctors();
    };

    function selectedValue(id) {
        const element = document.getElementById(id);
        return element ? element.value : '';
    }

    function setSelectedValue(id, value) {
        const element = document.getElementById(id);
        if (element) element.value = value || '';
    }

    window.syncFilterPills = function () {
        document.querySelectorAll('.filter-select').forEach(select => {
            const isDefaultSort = select.id === 'sortFilter' && (!select.value || select.value === 'recommended');
            select.classList.toggle('is-active', Boolean(select.value) && !isDefaultSort);
        });

        const dealButton = document.querySelector('.filter-btn.deal');
        if (dealButton) dealButton.classList.toggle('active', selectedValue('availabilityFilter') === 'today');
    };

    function doctorHasVisitType(doctor, visitType) {
        if (!visitType) return true;
        const visitTypes = doctor.visitTypes || [];
        if (visitTypes.includes(visitType)) return true;
        if (visitType === 'video') return normalize(doctor.notes).includes('video');
        return visitType === 'clinic';
    }

    function doctorMatchesAvailability(doctor, availability) {
        if (!availability) return true;
        const nextAvailable = normalize(doctor.nextAvailable);
        if (availability === 'today') return nextAvailable.includes('bu gün');
        if (availability === 'tomorrow') return nextAvailable.includes('sabah');
        return true;
    }

    function sortDoctors(list) {
        const sort = window.selectedSort || selectedValue('sortFilter') || 'recommended';
        const sorted = [...list];
        if (sort === 'rating') sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        if (sort === 'experience') sorted.sort((a, b) => (b.experience || 0) - (a.experience || 0));
        if (sort === 'reviews') sorted.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        return sorted;
    }

    function ensureSearchTools() {
        const filters = document.querySelector('.filter-buttons');
        if (!filters || document.querySelector('.search-flow-tools')) return;

        const tools = document.createElement('div');
        tools.className = 'search-flow-tools';
        tools.innerHTML = `
            <label class="search-flow-field">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="headerSearchInput" placeholder="Həkim, ixtisas və ya klinika...">
            </label>
            <label class="search-flow-field">
                <i class="fa-solid fa-id-card"></i>
                <select id="insuranceFilter" aria-label="Sığorta filtri">
                    <option value="">Sığorta seçin</option>
                    <option value="Paşa Sığorta">Paşa Sığorta</option>
                    <option value="Atəşgah">Atəşgah</option>
                    <option value="Qala Sığorta">Qala Sığorta</option>
                    <option value="Meqa Sığorta">Meqa Sığorta</option>
                    <option value="İcbari Tibbi Sığorta">İcbari Tibbi Sığorta</option>
                </select>
            </label>
            <button class="search-flow-btn" type="button" onclick="performHeaderSearch()"><i class="fa-solid fa-magnifying-glass"></i> Axtar</button>
            <button class="search-flow-btn secondary" type="button" onclick="resetFilters()"><i class="fa-solid fa-rotate-left"></i> Sıfırla</button>
        `;
        filters.before(tools);

        const input = tools.querySelector('#headerSearchInput');
        const insurance = tools.querySelector('#insuranceFilter');
        input.addEventListener('keydown', event => {
            if (event.key === 'Enter') performHeaderSearch();
        });
        insurance.addEventListener('change', () => selectInsurance(insurance.value));
    }

    function setupResultChips() {
        document.querySelectorAll('.result-chip').forEach(chip => {
            if (chip.dataset.flowReady) return;
            chip.dataset.flowReady = 'true';
            chip.setAttribute('role', 'button');
            chip.setAttribute('tabindex', '0');

            const activate = () => {
                const text = normalize(chip.textContent);
                if (text.includes('klinikaya')) {
                    window.location.href = 'clinics.htm';
                    return;
                }
                if (text.includes('xəritədə') || text.includes('xeritede')) {
                    const mapContainer = document.querySelector('.map-container');
                    if (mapContainer) mapContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    if (typeof map !== 'undefined' && map) window.setTimeout(() => map.invalidateSize(), 250);
                    return;
                }
                if (text.includes('sığorta') || text.includes('sigorta')) {
                    const insurance = document.getElementById('insuranceFilter');
                    if (insurance) insurance.focus();
                }
            };

            chip.addEventListener('click', activate);
            chip.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    activate();
                }
            });
        });
    }

    window.renderDoctors = function () {
        const doctorList = document.getElementById('doctorList');
        const noResults = document.getElementById('noResults');
        if (!doctorList || !noResults) return;

        if (filteredDoctors.length === 0) {
            doctorList.innerHTML = '';
            noResults.style.display = 'block';
            document.getElementById('doctorCount').textContent = '0';
            document.getElementById('resultCount').textContent = '0';
            return;
        }

        noResults.style.display = 'none';
        const savedCount = getSavedDoctors().length;
        const statusText = savedCount
            ? `${filteredDoctors.length} nəticə göstərilir. ${savedCount} həkim yadda saxlanılıb.`
            : `${filteredDoctors.length} nəticə göstərilir. Uyğun həkimi yadda saxlayıb sonra rezervasiyaya qayıda bilərsiniz.`;

        doctorList.innerHTML = `<div class="filter-feedback"><i class="fa-solid fa-circle-info"></i> ${statusText}</div>` + filteredDoctors.map(doctor => `
            <div class="doctor-item">
                <img src="${doctor.image}" alt="${doctor.name}" class="doctor-photo">
                <div class="doctor-info">
                    <h3>${doctor.name}</h3>
                    <div class="doctor-title">${doctor.specialty}</div>
                    <div class="doctor-rating">
                        <span class="stars">${'<i class="fa-solid fa-star"></i>'.repeat(Math.floor(doctor.rating))}</span>
                        <span>${doctor.rating}</span>
                        <span class="review-count">${doctor.reviews} rəy</span>
                    </div>
                    <div class="doctor-meta">
                        <i class="fa-solid fa-hospital"></i>
                        ${doctor.clinic || 'Klinika qeyd edilməyib'}
                    </div>
                    <div class="doctor-meta">
                        <i class="fa-solid fa-location-dot"></i>
                        ${doctor.location}
                    </div>
                    <div class="insurance-list">
                        ${doctor.insurance.map(ins => `<span class="insurance-badge">${ins}</span>`).join('')}
                    </div>
                    <div class="doctor-quick-meta">
                        <span><i class="fa-solid fa-clock"></i> ${doctor.nextAvailable || 'Vaxt sorğu ilə'}</span>
                        <span><i class="fa-solid fa-tag"></i> ${doctor.price || 'Qiymət sorğu ilə'}</span>
                        <span><i class="fa-solid fa-language"></i> ${(doctor.languages || ['Azərbaycan']).slice(0, 2).join(', ')}</span>
                    </div>
                    <div class="doctor-notes">
                        ${doctor.experience} il təcrübə · ${doctor.notes}
                    </div>
                    ${doctor.bio ? `<details class="doctor-notes"><summary class="read-bio">Bioqrafiyanı oxu</summary>${doctor.bio}</details>` : ''}
                    <div class="doctor-actions">
                        <a href="${doctorProfileUrl(doctor)}" class="doctor-action-btn secondary"><i class="fa-solid fa-user-doctor"></i> Profilə bax</a>
                        <a href="${reservationUrl(doctor)}" class="doctor-action-btn primary"><i class="fa-solid fa-calendar-check"></i> Qəbula yazıl</a>
                        <button type="button" class="doctor-save-btn ${isDoctorSaved(doctor.id) ? 'is-saved' : ''}" onclick="toggleSavedDoctor('${doctor.id}', event)">
                            <i class="fa-${isDoctorSaved(doctor.id) ? 'solid' : 'regular'} fa-bookmark"></i>
                            ${isDoctorSaved(doctor.id) ? 'Saxlanıldı' : 'Yadda saxla'}
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        document.getElementById('doctorCount').textContent = filteredDoctors.length;
        document.getElementById('resultCount').textContent = filteredDoctors.length;
        if (window.SmartHealthGlobal && window.SmartHealthGlobal.animatePage) {
            window.SmartHealthGlobal.animatePage(doctorList);
        }
    };

    window.applyFilters = function () {
        filteredDoctors = sortDoctors(doctors.filter(doctor => {
            const searchTarget = normalize(`${doctor.name} ${doctor.specialty} ${doctor.clinic || ''} ${doctor.location} ${doctor.notes} ${doctor.insurance.join(' ')}`);
            const hasSearch = !searchTerm || searchTarget.includes(normalize(searchTerm));
            const hasSpecialty = !currentFilter || doctor.specialty === currentFilter;
            const hasInsurance = !selectedInsurance || doctor.insurance.some(item => normalize(item).includes(normalize(selectedInsurance)) || normalize(selectedInsurance).includes(normalize(item)));
            const hasCity = !window.selectedCity || normalize(doctor.location).includes(normalize(window.selectedCity));
            const hasGender = !window.selectedGender || doctor.gender === window.selectedGender;
            const hasVisitType = doctorHasVisitType(doctor, window.selectedVisitType);
            const hasAvailability = doctorMatchesAvailability(doctor, window.selectedAvailability);

            return hasSearch && hasSpecialty && hasInsurance && hasCity && hasGender && hasVisitType && hasAvailability;
        }));

        renderDoctors();
        if (typeof map !== 'undefined' && map) updateMapMarkers();
    };

    window.performHeaderSearch = function () {
        const input = document.getElementById('headerSearchInput');
        searchTerm = input ? input.value.trim() : '';

        const url = new URL(window.location.href);
        if (searchTerm) url.searchParams.set('search', searchTerm);
        else url.searchParams.delete('search');
        window.history.pushState({}, '', url);

        applyFilters();
    };

    window.filterBySpecialtyAndMark = function (specialty) {
        currentFilter = specialty || null;
        document.getElementById('filterTitle').textContent = currentFilter || 'Bütün Həkimlər';
        setSelectedValue('specialtyFilter', currentFilter || '');

        const url = new URL(window.location.href);
        if (currentFilter) url.searchParams.set('specialty', currentFilter);
        else url.searchParams.delete('specialty');
        window.history.pushState({}, '', url);
        syncFilterPills();
        applyFilters();
    };

    window.filterBySpecialty = window.filterBySpecialtyAndMark;

    window.selectInsurance = function (insurance, event) {
        if (event) event.stopPropagation();
        selectedInsurance = insurance || null;
        const display = document.getElementById('insuranceDisplay');
        const dropdown = document.getElementById('insuranceDropdown');
        const insuranceSelect = document.getElementById('insuranceFilter');
        if (display) display.textContent = insurance;
        if (dropdown) dropdown.style.display = 'none';
        if (insuranceSelect) insuranceSelect.value = insurance || '';

        const url = new URL(window.location.href);
        if (insurance) url.searchParams.set('insurance', insurance);
        else url.searchParams.delete('insurance');
        window.history.pushState({}, '', url);
        syncFilterPills();
        applyFilters();
    };

    window.updateAdvancedFilter = function (type, value) {
        if (type === 'gender') window.selectedGender = value;
        if (type === 'visitType') window.selectedVisitType = value;
        if (type === 'availability') window.selectedAvailability = value;
        if (type === 'sort') window.selectedSort = value || 'recommended';

        const url = new URL(window.location.href);
        const params = { gender: 'gender', visitType: 'visitType', availability: 'availability', sort: 'sort' };
        const param = params[type];
        if (param) {
            if (value && !(type === 'sort' && value === 'recommended')) url.searchParams.set(param, value);
            else url.searchParams.delete(param);
            window.history.pushState({}, '', url);
        }
        syncFilterPills();
        applyFilters();
    };

    window.resetFilters = function () {
        currentFilter = null;
        searchTerm = '';
        selectedInsurance = null;
        window.selectedCity = null;
        window.selectedGender = '';
        window.selectedVisitType = '';
        window.selectedAvailability = '';
        window.selectedSort = 'recommended';
        const input = document.getElementById('headerSearchInput');
        const display = document.getElementById('insuranceDisplay');
        if (input) input.value = '';
        if (display) display.textContent = 'Sığorta seçin';
        setSelectedValue('insuranceFilter', '');
        setSelectedValue('genderFilter', '');
        setSelectedValue('visitTypeFilter', '');
        setSelectedValue('availabilityFilter', '');
        setSelectedValue('specialtyFilter', '');
        setSelectedValue('sortFilter', 'recommended');
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById('filterTitle').textContent = 'Bütün Həkimlər';

        const url = new URL(window.location.href);
        ['specialty', 'search', 'clinic', 'insurance', 'city', 'careType', 'gender', 'visitType', 'availability', 'sort'].forEach(param => url.searchParams.delete(param));
        window.history.pushState({}, '', url);
        syncFilterPills();
        applyFilters();
    };

    document.addEventListener('DOMContentLoaded', function () {
        ensureSearchTools();
        setupResultChips();

        const params = new URLSearchParams(window.location.search);
        const input = document.getElementById('headerSearchInput');
        const search = params.get('search') || params.get('clinic') || '';
        const rawSpecialty = params.get('specialty');
        const insurance = params.get('insurance');
        const clinic = params.get('clinic');
        const city = params.get('city');
        const careType = params.get('careType');
        const gender = params.get('gender') || '';
        const visitType = params.get('visitType') || '';
        const availability = params.get('availability') || '';
        const sort = params.get('sort') || 'recommended';

        searchTerm = search;
        selectedInsurance = insurance;
        window.selectedCity = city;
        window.selectedGender = gender;
        window.selectedVisitType = visitType;
        window.selectedAvailability = availability;
        window.selectedSort = sort;

        if (input) input.value = search;
        if (insurance) {
            const display = document.getElementById('insuranceDisplay');
            if (display) display.textContent = insurance;
            setSelectedValue('insuranceFilter', insurance);
        }
        setSelectedValue('genderFilter', gender);
        setSelectedValue('visitTypeFilter', visitType);
        setSelectedValue('availabilityFilter', availability);
        setSelectedValue('sortFilter', sort);

        if (rawSpecialty) {
            currentFilter = specialtyMap[normalize(rawSpecialty)] || rawSpecialty;
            document.getElementById('filterTitle').textContent = currentFilter;
            setSelectedValue('specialtyFilter', currentFilter);
        } else if (clinic) {
            document.getElementById('filterTitle').textContent = `${clinic} həkimləri`;
        } else if (city) {
            document.getElementById('filterTitle').textContent = `${city} üzrə həkimlər`;
        } else if (careType) {
            searchTerm = careType === 'physical' ? 'Terapevt' : searchTerm;
            if (input && !input.value) input.value = searchTerm;
            document.getElementById('filterTitle').textContent = 'Uyğun qəbul nəticələri';
        }

        syncFilterPills();
        applyFilters();
    });

    document.addEventListener('smarthealth:navbar-ready', function () {
        ensureSearchTools();
        setupResultChips();
        const input = document.getElementById('headerSearchInput');
        if (input) input.value = searchTerm || '';
        setSelectedValue('insuranceFilter', selectedInsurance || '');
        syncFilterPills();
    });
}());
