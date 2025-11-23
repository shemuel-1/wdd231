// joinModals.mjs — sets hidden timestamp and wires membership modals

// const modalIds = ['modal-np', 'modal-bronze', 'modal-silver', 'modal-gold'];
let lastTrigger = null;

function openModal(modal) {
    // store currently focused element (trigger) is handled in event listener
    modal.setAttribute('aria-hidden', 'false');
    const close = modal.querySelector('[data-close]');
    if (close) close.focus();
}

function closeModal(modal) {
    // return focus to the triggering element before hiding the modal
    if (lastTrigger && document.contains(lastTrigger)) {
        try {
            lastTrigger.focus();
        }
        catch (e) {
            document.body.focus();
        }
    }
    else {
        document.body.focus();
    }
    modal.setAttribute('aria-hidden', 'true');
    lastTrigger = null;
}

function wire() {
    // timestamp
    const tStamp = document.getElementById('timestamp');
    if (tStamp) tStamp.value = new Date().toISOString();

    // openers: links inside .cards with data-modal
    document.querySelectorAll('.cards a[data-modal]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const id = link.getAttribute('data-modal');
            const modal = document.getElementById(id);

            if (modal) {
                lastTrigger = link;
                openModal(modal);
            }
        });
    });

    // close buttons
    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) closeModal(modal);
        });
    });

    // backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', e => {
            if (e.target === modal) closeModal(modal);
        });
    });

    // Escape closes open modals
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal[aria-hidden="false"]').forEach(m => closeModal(m));
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
}

else { wire(); }


// Read query params and show required fields
document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const required = [
        { k: 'firstName', label: 'First name' },
        { k: 'lastName', label: 'Last name' },
        { k: 'email', label: 'Email' },
        { k: 'phone', label: 'Mobile phone' },
        { k: 'orgName', label: 'Business / Organization' },
        { k: 'timestamp', label: 'Submitted at' }
    ];

    const dl = document.getElementById('results');
    required.forEach(function (item) {
        const dt = document.createElement('dt'); dt.textContent = item.label;
        const dd = document.createElement('dd');
        const val = params.get(item.k) || '';

        if (item.k === 'timestamp' && val) {
            try { const d = new Date(val); dd.textContent = d.toLocaleString(); }
            catch (e) { dd.textContent = val }
        }

        else { dd.textContent = val }
        dl.appendChild(dt); dl.appendChild(dd);
    });
});

