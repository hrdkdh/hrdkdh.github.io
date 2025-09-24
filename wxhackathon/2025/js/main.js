// WX Hackathon 2025 Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    initMobileMenu();
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // FAQ accordion functionality
    initFAQAccordion();
    
    // File upload functionality
    initFileUpload();
    
    // Form submission
    initFormSubmission();
    
    // Scroll animations
    initScrollAnimations();
    
    // Navigation highlighting based on scroll position
    initNavigationHighlight();
    
    // Background music functionality
    initBackgroundMusic();

});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // 현재 스크롤 위치에 따라 아이콘 색상 결정
            const heroSection = document.querySelector('.hero-section');
            const scrollY = window.scrollY;
            const heroHeight = heroSection ? heroSection.offsetHeight : 800;
            const isInHero = scrollY < heroHeight - 100;
            
            const svg = mobileMenuButton.querySelector('svg');
            if (mobileMenu.classList.contains('hidden')) {
                // 메뉴 닫힘 - 햄버거 아이콘
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
                svg.classList = isInHero ? 'w-6 h-6 text-white' : 'w-6 h-6 text-gray-700';
            } else {
                // 메뉴 열림 - X 아이콘
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
                svg.classList = isInHero ? 'w-6 h-6 text-white' : 'w-6 h-6 text-gray-700';

                // 모바일 메뉴 배경색도 현재 위치에 따라 설정
                const mobileMenuContent = mobileMenu.querySelector('div');
                if (mobileMenuContent) {
                    mobileMenuContent.className = isInHero ? 
                        'px-4 pt-2 pb-4 space-y-2 bg-black/90 backdrop-blur-xl shadow-xl border-b border-white/20' :
                        'px-4 pt-2 pb-4 space-y-2 bg-white/98 backdrop-blur-xl shadow-xl border-b border-gray-200';
                    
                    // 모바일 메뉴 링크 색상도 변경
                    const mobileLinks = mobileMenuContent.querySelectorAll('a:not([href*="#apply"])');
                    mobileLinks.forEach(link => {
                        link.className = isInHero ?
                            'block px-4 py-3 rounded-lg text-white hover:text-blue-300 hover:bg-white/10 transition-all duration-300 font-semibold' :
                            'block px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 font-semibold';
                    });
                }
            }
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                
                // 현재 위치에 따라 아이콘 색상 설정
                const heroSection = document.querySelector('.hero-section');
                const scrollY = window.scrollY;
                const heroHeight = heroSection ? heroSection.offsetHeight : 800;
                const isInHero = scrollY < heroHeight - 100;
                
                const svg = mobileMenuButton.querySelector('svg');
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
                svg.className = isInHero ? 'w-6 h-6 text-white' : 'w-6 h-6 text-gray-700';
            });
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// FAQ Accordion
function initFAQAccordion() {
    const faq_data = [
        { "color" : "blue", "question" : "🎯 해커톤이 무엇인가요?", "answer" : "해커톤(Hackathon) : 해킹+마라톤의 합성어로, 행사가 끝날 때까지 도전 과제의 목표된 성과를 도출해 내는 끝장 개발 대회입니다." },
        { "color" : "green", "question" : "📍 행사 장소는 어디인가요?", "answer" : "오프라인 팀밋업(10월 23일), 본선(11월 6일~7일) 모두 인재창조원 송도캠퍼스 컨벤션센터 1층 이벤트홀에서 진행됩니다." },
        { "color" : "purple", "question" : "🏠 숙박은 제공되나요?", "answer" : "네, 오프라인 팀밋업, 본선 모두 인재창조원 레지던스홀 숙박이 제공됩니다." },
        { "color" : "orange", "question" : "👥 참가자격은 어떻게 되나요?", "answer" : "전공, 직무, 직급, 근속년수, 연령, 학력, 성별 등에 관계 없이 누구나 참가할 수 있습니다." },
        { "color" : "pink", "question" : "🤝 팀은 어떻게 구성하나요?", "answer" : "소속회사나 부서에 관계 없이 기획자 1명, 개발자 2명, 디자이너 1명으로 4인 1팀 구성입니다. 지원서에 작성한 내용을 참고하여, 운영 측에서 최적의 팀 매칭을 지원할 예정입니다." },
        { "color" : "indigo", "question" : "⚡ 참자가 선발은 언제 알 수 있나요?", "answer" : "10월 16일에 개인 메일로 참가 여부를 알려드립니다." },
        { "color" : "teal", "question" : "🎓 팀 구성은 언제 알 수 있나요?", "answer" : "오프라인 팀밋업(10월 23일) 참석하시면 알려드립니다." },
        { "color" : "rose", "question" : "📅 오프라인 팀밋업은 꼭 참석해야 하나요?", "answer" : "네, 오프라인 팀밋업을 통해 팀 구성원들, 조별로 1인씩 배치되는 기술 코치와 첫 만남을 가지게 됩니다. 과제 수행관련 강연과 실습도 진행되므로 반드시 참석해야 합니다." },
        { "color" : "cyan", "question" : "🛠️ 개발에 어떤 도구를 사용할 수 있나요?", "answer" : "개발 도구에 제한 없이 어떤 도구라도 사용이 가능합니다.(ChatGPT, Streamlit, Cursor AI, Copilot Studio, n8n 등)" },
        { "color" : "amber", "question" : "🖥️ 개발 환경은 제공되나요?", "answer" : "네, 본선 당일에 노트북과 개발에 필요한 환경이 모두 제공됩니다." },
        { "color" : "emerald", "question" : "🧑‍🏫 멘토링은 어떻게 진행되나요?", "answer" : "오프라인 팀밋업이 끝나면, 온라인 학습 및 팀빌딩 기간(2주) 동안 전문 코치와 팀 간의 1:1 프로젝트 멘토링이 제공됩니다." },
        { "color" : "violet", "question" : "🕒 1박 2일 동안 계속 개발하나요?", "answer" : "1박 2일 무박이 필수는 아닙니다. 운영진이 무박 2일 간 교육 환경과 관련 서비스를 제공해드리며, 참가자들의 안전과 편의를 위해 최선을 다하지만, 휴식이 필요한 경우 조별로 자율적으로 시간을 조절하시면 됩니다." },
        { "color" : "fuchsia", "question" : "🚗 본선 기간동안 출퇴근하며 참가해도 되나요?", "answer" : "WX해커톤의 취지는 정해진 기간 동안 팀원들이 모두 협업해 몰입을 통한 혁신을 체험하는 것에 있습니다. 출퇴근이 불가능한 것은 아니나 권장하지는 않습니다. 팀워크를 고려해 결정해주면 좋겠습니다." },
        { "color" : "sky", "question" : "💼 근태 신청은 어떻게 해야하나요? 교육출장으로 하면 되나요?", "answer" : "인재창조원 공식 교육이므로 교육출장으로 신청하면 되나, 회사마다 정책이 상이하므로 보다 정확한 사항은 각 사 HR부서에 문의하시기 바랍니다." },
        { "color" : "lime", "question" : "🎒 참가 시 준비물이 있나요?", "answer" : "개발에 사용할 디바이스(노트북, 스마트폰 등) 및 편한 복장과 함께 개인 물품(세안도구, 충전기 등)과 개인 복용약품 등을 준비하면 됩니다." },
        { "color" : "stone", "question" : "❗ 참가 시 주의사항은 무엇인가요?", "answer" : "피로, 스트레스, 식사, 수면 등에 예민한 분은 행사 기간 동안 개인 건강 상태를 꾸준히 체크하고 무리하지 않도록 조심해주세요." }
    ]
    const faqAccordion = document.getElementById('faq-accordion');
    faq_data.forEach((item, index) => {
        var html = `
            <div class="faq-item bg-gradient-to-r from-${item.color}-50 to-white border-2 border-${item.color}-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div class="faq-question p-8 cursor-pointer flex items-center justify-between hover:bg-${item.color}-50/50 transition-colors duration-300">
                    <h3 class="text-xl font-bold text-gray-900 pr-4"> ${item.question}</h3>
                    <i class="fas fa-chevron-down faq-icon text-${item.color}-600 text-xl transition-transform duration-300"></i>
                </div>
                <div class="faq-answer px-8 pb-8">
                    <div class="bg-white rounded-xl p-6 border-l-4 border-${item.color}-500">
                        <p class="text-gray-700 text-lg leading-relaxed">${item.answer}</p>
                    </div>
                </div>
            </div>
        `;
        faqAccordion.insertAdjacentHTML('beforeend', html);
    });
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach((question, index) => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('.faq-icon');
        
        // Make first FAQ item open by default
        if (index === 0) {
            answer.classList.add('active');
            question.classList.add('active');
            icon.style.transform = 'rotate(180deg)';
        }
        
        question.addEventListener('click', function() {
            const isCurrentlyActive = answer.classList.contains('active');
            
            // Close all FAQ items
            faqQuestions.forEach(otherQuestion => {
                const otherAnswer = otherQuestion.nextElementSibling;
                const otherIcon = otherQuestion.querySelector('.faq-icon');
                
                otherAnswer.classList.remove('active');
                otherQuestion.classList.remove('active');
                otherIcon.style.transform = 'rotate(0deg)';
            });
            
            // If current item wasn't active, open it
            if (!isCurrentlyActive) {
                answer.classList.add('active');
                question.classList.add('active');
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

// File Upload Functionality
function initFileUpload() {
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.querySelector('#file-upload');
    const fileList = document.querySelector('.file-list');
    
    if (uploadArea && fileInput) {
        // Click to upload
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });
        
        // Drag and drop functionality
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            handleFileSelection(files);
        });
        
        // File input change
        fileInput.addEventListener('change', (e) => {
            handleFileSelection(e.target.files);
        });
    }
}

// Handle File Selection
function handleFileSelection(files) {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = ['.ppt', '.pptx', '.doc', '.docx', '.pdf', '.zip'];
    
    Array.from(files).forEach(file => {
        // Validate file size
        if (file.size > maxSize) {
            showNotification('파일 크기는 50MB 이하여야 합니다.', 'error');
            return;
        }
        
        // Validate file type
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        if (!allowedTypes.includes(fileExtension)) {
            showNotification('지원하지 않는 파일 형식입니다.', 'error');
            return;
        }
        
        // Add file to list
        addFileToList(file);
    });
}

// Add File to List
function addFileToList(file) {
    const fileList = document.querySelector('.file-list');
    
    const fileItem = document.createElement('div');
    fileItem.className = 'flex items-center justify-between bg-gray-50 p-3 rounded-lg';
    
    fileItem.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-file-alt text-blue-600 mr-3"></i>
            <div>
                <p class="text-sm font-medium text-gray-900">${file.name}</p>
                <p class="text-xs text-gray-500">${formatFileSize(file.size)}</p>
            </div>
        </div>
        <button class="remove-file text-red-600 hover:text-red-800">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add remove functionality
    const removeButton = fileItem.querySelector('.remove-file');
    removeButton.addEventListener('click', () => {
        fileItem.remove();
    });
    
    fileList.appendChild(fileItem);
}

// Format File Size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Form Submission
function initFormSubmission() {
    const applicationForm = document.querySelector('#application-form');
    const roleSelect = document.querySelector('#role');
    
    // Role-based field visibility
    if (roleSelect) {
        roleSelect.addEventListener('change', function() {
            toggleRoleFields(this.value);
        });
    }
    
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate role-specific required fields
            if (!validateRoleSpecificFields()) {
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<div class="loading-spinner"></div> 제출 중...';
            submitButton.disabled = true;
            
            axios.post("https://wxsurvey.kr/api/wxhackathon_apply", {
                name: document.querySelector('#name').value,
                role: document.querySelector('#role').value,
                company: document.querySelector('#company').value,
                department_name: document.querySelector('#department').value,
                email: document.querySelector('#email').value,
                cellphone: document.querySelector('#phone').value,
                agent_name: document.querySelector('#agent-name').value,
                tech_summary: document.querySelector('#tech-summary').value
            }).then(async function (response) {
                if (!response.data || response.data.result !== 'success') {
                    // Reset button
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    // Show error message
                    showNotification('참가 신청서 제출에 실패했습니다. 다시 시도해주세요.', 'error');
                    alert('참가 신청서 제출에 실패했습니다. 다시 시도해주세요.');
                    return;
                } 
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;

                // 파일이 있을 경우 업로드 처리 (완료될 때까지 대기)
                var uploadSuccess = await submitFileUpload(response.data.id);
                if (!uploadSuccess) {
                    alert('참가 신청서는 성공적으로 제출되었으나 파일 전송에는 실패했습니다. 파일은 이메일로 따로 전달해 주세요(DRM해제 必).');
                } else {
                    // Show success message
                    showNotification('참가 신청서가 성공적으로 제출되었습니다!', 'success');
                }

                // Reset form
                document.querySelector('#application-form').reset();
                toggleRoleFields(''); // Hide all conditional fields
                
                // Clear file list
                const fileList = document.querySelector('.file-list');
                if (fileList) {
                    fileList.innerHTML = '';
                }
            }).catch(function (error) {
                console.log(error);
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                // Show error message
                showNotification('참가 신청서 제출 중 오류가 발생했습니다. 다시 시도해주세요.', 'error');
                alert('참가 신청서 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
            });
        });
    }
}

//파일 업로드 구현
async function submitFileUpload(data_id) {
    const fileInput = document.querySelector('#file-upload');

    // No files: exit silently
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        return;
    }

    // Create overlay and lock scroll
    const overlay = document.createElement('div');
    overlay.id = 'upload-overlay';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.background = 'rgba(0,0,0,0.5)';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';

    const modal = document.createElement('div');
    modal.id = 'upload-modal';
    modal.style.background = '#ffffff';
    modal.style.color = '#111827';
    modal.style.padding = '20px 28px';
    modal.style.borderRadius = '12px';
    modal.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    modal.style.fontWeight = '700';
    modal.textContent = '파일 업로드 중입니다...';

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    try {
        const formData = new FormData();
        Array.from(fileInput.files).forEach((f) => {
            formData.append('file', f);
        });

        // Let the browser set the correct multipart boundary
        const response = await axios.post(`https://wxsurvey.kr/api/wxhackathon_upload/${data_id}`, formData);
        if (!response.data || response.data.result !== 'success') {
            showNotification('파일 업로드에 실패했습니다. 다시 시도해주세요.', 'error');
            alert('파일 업로드에 실패했습니다. 다시 시도해주세요.');
            return false;
        }
        showNotification('파일이 성공적으로 업로드되었습니다!', 'success');
        return true;
    } catch (error) {
        console.log(error);
        showNotification('파일 업로드 중 오류가 발생했습니다. 다시 시도해주세요.', 'error');
        alert('파일 업로드 중 오류가 발생했습니다. 다시 시도해주세요.');
        return false;
    } finally {
        // Remove overlay and restore scroll
        try { overlay.remove(); } catch (e) {}
        document.body.style.overflow = previousOverflow || '';
    }
}

//테스트를 위한 폼값 랜덤 키인
function randomKeyIn() {
    const names = ['홍길동', '김철수', '이영희', '박민수', '최지우'];
    const companies = ['포스코', '네이버', '카카오', '삼성전자', 'LG전자'];
    const departments = ['개발팀', '디자인팀', '기획팀', '마케팅팀', '영업팀'];
    const roles = ['dreamer', 'developer', 'designer'];
    const randomIndex = (arr) => Math.floor(Math.random() * arr.length);
    document.querySelector('#name').value = names[randomIndex(names)];
    document.querySelector('#company').value = companies[randomIndex(companies)];
    document.querySelector('#department').value = departments[randomIndex(departments)];
    document.querySelector('#role').value = roles[randomIndex(roles)];
    document.querySelector('#email').value = `test${randomIndex(1000)}@example.com`;
    document.querySelector('#phone').value = `010-${randomIndex(10000)}-${randomIndex(10000)}`;
    document.querySelector('#agent-name').value = names[randomIndex(names)];
    document.querySelector('#tech-summary').value = 'AI, ML, Web Development';
}

// Toggle role-specific fields
function toggleRoleFields(role) {
    const agentField = document.querySelector('.agent-field');
    const techField = document.querySelector('.tech-field');
    const agentInput = document.querySelector('#agent-name');
    const techTextarea = document.querySelector('#tech-summary');
    
    // Hide all fields first
    if (agentField) {
        agentField.style.display = 'none';
        agentInput.required = false;
    }
    if (techField) {
        techField.style.display = 'none';
        techTextarea.required = false;
    }
    
    // Show relevant field based on role
    if (role === 'dreamer') {
        agentField.style.display = 'block';
        agentInput.required = true;
    } else if (role === 'developer' || role === 'designer') {
        techField.style.display = 'block';
        techTextarea.required = true;
    }
}

// Validate role-specific required fields
function validateRoleSpecificFields() {
    const role = document.querySelector('#role').value;
    const agentName = document.querySelector('#agent-name') ? document.querySelector('#agent-name').value.trim() : '';
    const techSummary = document.querySelector('#tech-summary') ? document.querySelector('#tech-summary').value.trim() : '';
    
    if (role === 'dreamer' && !agentName) {
        showNotification('Dreamer는 AI Agent명을 작성해야 합니다.', 'error');
        document.querySelector('#agent-name').focus();
        return false;
    }
    
    if ((role === 'developer' || role === 'designer') && !techSummary) {
        showNotification('Developer/Designer는 보유 역량 요약을 작성해야 합니다.', 'error');
        document.querySelector('#tech-summary').focus();
        return false;
    }
    
    return true;
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Navigation Highlighting and Scroll Effect
function initNavigationHighlight() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const heroSection = document.querySelector('.hero-section');
    
    function updateNavbarStyle() {
        if (!navbar) return;
        
        const scrollY = window.scrollY;
        const heroHeight = heroSection ? heroSection.offsetHeight : 800;
        
        // 히어로 섹션 내에 있을 때 (어두운 배경)
        if (scrollY < heroHeight - 100) {
            // 어두운 배경용 스타일
            navbar.className = 'fixed top-0 w-full z-50 transition-all duration-300 bg-black/20 backdrop-blur-xl shadow-lg border-b border-white/10';
            
            // 로고 텍스트를 흰색으로
            const logoTitle = navbar.querySelector('h1');
            const logoSubtitle = navbar.querySelector('p');
            if (logoTitle) logoTitle.className = 'text-lg font-black text-white';
            if (logoSubtitle) logoSubtitle.className = 'text-xs font-semibold text-white/80 -mt-1';
            
            // 메뉴 링크를 흰색으로
            const menuLinks = navbar.querySelectorAll('.nav-link:not([href*="#apply"])');
            menuLinks.forEach(link => {
                link.className = 'nav-link px-3 py-2 rounded-lg text-white hover:text-blue-300 hover:bg-white/10 transition-all duration-300 font-semibold text-sm hover:scale-105';
            });
            
            // 모바일 메뉴 버튼 아이콘을 흰색으로
            const mobileIcon = navbar.querySelector('.mobile-menu-button svg');
            if (mobileIcon) mobileIcon.className = 'w-6 h-6 text-white';
            
        } else {
            // 밝은 배경용 스타일 (기존)
            navbar.className = 'fixed top-0 w-full z-50 transition-all duration-300 bg-white/98 backdrop-blur-xl shadow-lg border-b border-gray-200';
            
            // 로고 텍스트를 원래 색상으로
            const logoTitle = navbar.querySelector('h1');
            const logoSubtitle = navbar.querySelector('p');
            if (logoTitle) logoTitle.className = 'text-lg font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent';
            if (logoSubtitle) logoSubtitle.className = 'text-xs font-semibold text-gray-600 -mt-1';
            
            // 메뉴 링크를 원래 색상으로
            const menuLinks = navbar.querySelectorAll('.nav-link:not([href*="#apply"])');
            menuLinks.forEach(link => {
                link.className = 'nav-link px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 font-semibold text-sm hover:scale-105';
            });
            
            // 모바일 메뉴 버튼 아이콘을 원래 색상으로
            const mobileIcon = navbar.querySelector('.mobile-menu-button svg');
            if (mobileIcon) mobileIcon.className = 'w-6 h-6 text-gray-700';
        }
    }
    
    // 페이지 로드 시 초기 스타일 적용
    updateNavbarStyle();
    
    // 스크롤 시 스타일 업데이트
    window.addEventListener('scroll', updateNavbarStyle);
    
    // Section highlighting
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                // Remove active states from all nav links
                navLinks.forEach(link => {
                    if (!link.href.includes('#apply')) {
                        const scrollY = window.scrollY;
                        const heroHeight = heroSection ? heroSection.offsetHeight : 800;
                        
                        if (scrollY < heroHeight - 100) {
                            // 어두운 배경에서 기본 스타일
                            link.className = 'nav-link px-3 py-2 rounded-lg text-white hover:text-blue-300 hover:bg-white/10 transition-all duration-300 font-semibold text-sm hover:scale-105';
                        } else {
                            // 밝은 배경에서 기본 스타일
                            link.className = 'nav-link px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 font-semibold text-sm hover:scale-105';
                        }
                    }
                });
                
                // Add active state to current section link
                const activeLink = document.querySelector(`nav a[href="#${sectionId}"]:not([href="#apply"])`);
                if (activeLink) {
                    const scrollY = window.scrollY;
                    const heroHeight = heroSection ? heroSection.offsetHeight : 800;
                    
                    if (scrollY < heroHeight - 100) {
                        // 어두운 배경에서의 활성 스타일
                        activeLink.className = 'nav-link px-3 py-2 rounded-lg text-blue-300 bg-white/20 hover:text-blue-300 hover:bg-white/10 transition-all duration-300 font-semibold text-sm hover:scale-105';
                    } else {
                        // 밝은 배경에서의 활성 스타일
                        activeLink.className = 'nav-link px-3 py-2 rounded-lg text-blue-600 bg-blue-50 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 font-semibold text-sm hover:scale-105';
                    }
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-80px 0px -50% 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full transition-transform duration-300`;
    
    let bgColor, textColor, icon;
    switch (type) {
        case 'success':
            bgColor = 'bg-green-600';
            textColor = 'text-white';
            icon = '<i class="fas fa-check-circle mr-2"></i>';
            break;
        case 'error':
            bgColor = 'bg-red-600';
            textColor = 'text-white';
            icon = '<i class="fas fa-exclamation-circle mr-2"></i>';
            break;
        case 'warning':
            bgColor = 'bg-yellow-600';
            textColor = 'text-white';
            icon = '<i class="fas fa-exclamation-triangle mr-2"></i>';
            break;
        default:
            bgColor = 'bg-blue-600';
            textColor = 'text-white';
            icon = '<i class="fas fa-info-circle mr-2"></i>';
    }
    
    notification.className += ` ${bgColor} ${textColor}`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            ${icon}
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Download functionality
function downloadFile(filename, content, mimeType = 'application/octet-stream') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
}

// Utility function to scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button functionality
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (scrollButton) {
        if (window.pageYOffset > 300) {
            scrollButton.classList.remove('hidden');
        } else {
            scrollButton.classList.add('hidden');
        }
    }
});

// Background Music System (어벤져스 스타일 웅장한 음악)
function initBackgroundMusic() {
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    const bgMusicElement = document.getElementById('bgMusic');
    
    if (!musicToggle || !musicIcon || !bgMusicElement) {
        return;
    }
    
    let isMusicPlaying = false;
    
    // 음악 로딩 완료시 버튼 활성화
    bgMusicElement.addEventListener('canplay', () => {
        musicToggle.title = '배경음악 재생';
    });
    
    // 음악 토글 함수
    function toggleMusic() {
        if (isMusicPlaying) {
            // 음악 정지
            bgMusicElement.pause();
            bgMusicElement.currentTime = 0;
            musicIcon.className = 'fas fa-volume-mute text-xl';
            musicToggle.title = '배경음악 재생';
            musicToggle.classList.remove('music-playing');
            musicToggle.style.animation = 'pulse 2s infinite';
            isMusicPlaying = false;
        } else {
            // 음악 재생
            bgMusicElement.volume = 0.3;
            const playPromise = bgMusicElement.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    musicIcon.className = 'fas fa-volume-up text-xl';
                    musicToggle.title = '배경음악 정지';
                    musicToggle.classList.add('music-playing');
                    musicToggle.style.animation = '';
                    isMusicPlaying = true;
                }).catch(error => {
                    // 재생 실패시 원래 상태 유지
                    console.error('음악 재생 실패:', error);
                });
            }
        }
    }
    
    // 클릭 이벤트 등록
    musicToggle.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMusic();
    });
    
    // 초기 상태 설정
    musicIcon.className = 'fas fa-volume-mute text-xl';
    musicToggle.title = '배경음악 재생';
    musicToggle.style.animation = 'pulse 2s infinite';
}

//개인정보 수집/이용 및 해커톤 규정 관련 팝업창
function openPolicyPopup() {
    //HTML 소스를 아래에 직접 작성해 레이어 팝업으로 띄움
    const content = `
        <style>
            #policyPopup h1 {
                margin-top: 20px;
                margin-bottom: 10px;
                font-weight:bold;
                font-size:14pt;
            }
            #policyPopup h2 {
                margin-top: 15px;
                margin-bottom: 8px;
                font-weight:bold;
                font-size:12pt;
            }
            #policyPopup p {
                margin-bottom: 10px;
                line-height: 1.6;
            }
        </style>
        <h1>WX해커톤 2025 'Agents Assemble!' 참가 규정</h1>
        <p>본 규정은 WX해커톤 2025 'Agents Assemble!' 참가자(이하 '참가자')에게 적용됩니다. 참가자는 본 대회 참가 신청 시 아래 규정에 동의한 것으로 간주합니다.</p>

        <h2>제1조 (참가 자격 및 팀 구성)</h2>
        <p>참가자는 기획자, 개발자, 디자이너 역할로 구분된 4인 이내의 팀으로 구성됩니다.<br>
        참가 신청서에 기재된 정보가 허위일 경우, 참가가 취소될 수 있습니다.<br>
        신청 및 선발 후 본선에 참가하지 않을 경우 팀 전체가 실격 처리됩니다.</p>

        <h2>제2조 (작품 출품 및 소유권)</h2>
        <p>참가자가 해커톤 기간 동안 개발한 모든 결과물(이하 '출품작')의 지식재산권(저작권)은 원칙적으로 참가자에게 있습니다.<br>
        단, 포스코인재창조원에서 결과물을 홍보, 전시, 교육 등 비영리적 목적으로 활용할 수 있습니다.<br>
        타인의 지식재산권을 침해한 것으로 밝혀질 경우, 심사에서 제외되며 수상이 취소될 수 있습니다. 이로 인해 발생하는 모든 민·형사상 책임은 참가자에게 있습니다.</p>

        <h2>제3조 (행사 진행 및 규정 준수)</h2>
        <p>참가자는 해커톤 기간 동안 주최측이 제공하는 규칙과 지시사항을 따라야 합니다.<br>
        해커톤의 공정한 진행을 위해 부정행위가 발견될 경우 참가 자격이 박탈될 수 있습니다.</p>

        <h1>개인정보 수집/이용 동의서</h1>
        <p>WX해커톤 2025 'Agents Assemble!' 참가 신청을 위해 아래와 같이 개인정보를 수집 및 이용합니다. 제공된 모든 정보는 '개인정보 보호법' 등 관련 법규에 의거하여 안전하게 관리됩니다.</p>

        <h2>1. 개인정보 수집 및 이용 목적</h2>
        <p>해커톤 참가자 등록 및 본인 확인<br>
        대회 운영 및 수상자 선정, 상금 지급 등 진행 업무<br>
        수상작 홍보 및 해커톤 사후 관리<br>
        참가 관련 정보 안내 및 문의 응대</p>

        <h2>2. 수집하는 개인정보의 항목</h2>
        <p>필수 항목: 성명, 회사명, 부서명, 휴대폰 번호, 이메일 주소<br>
        선택 항목: 팀원 정보, 참가 신청서에 포함된 포트폴리오 등</p>

        <h2>3. 개인정보의 보유 및 이용 기간</h2>
        <p>수집된 개인정보는 해커톤 종료 후 1년까지 보관하며, 이후 지체 없이 파기합니다.<br>
        단, 수상자의 경우 수상작의 홍보 및 기록 보존을 위해 관련 정보를 해커톤 종료 후 5년까지 보관할 수 있습니다.</p>

        <h2>4. 동의를 거부할 권리 및 동의 거부 시 불이익</h2>
        <p>참가자는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다.<br>
        필수 항목 수집에 동의하지 않을 경우 해커톤 참가 신청이 불가하며, 선택 항목에 동의하지 않아도 참가에는 불이익이 없습니다.</p>
    `;
    var popupWidth = 800;
    var popupHeight = 700;
    var left = (window.innerWidth / 2) - (popupWidth / 2);
    var top = (window.innerHeight / 2) - (popupHeight / 2);
    if (window.innerWidth < popupWidth + 40) {
        //화면이 작으면 꽉 채움
        popupWidth = window.innerWidth - 40;
        left = 20;
    }
    if (window.innerHeight < popupHeight + 40) {
        //화면이 작으면 꽉 채움
        popupHeight = window.innerHeight - 40;
        top = 20;
    }
    
    //기존 팝업이 있으면 제거
    const existingPopup = document.querySelector('#policyPopup');
    if (existingPopup) {
        existingPopup.remove();
    }

    //레이어로 된 html element 생성
    const popup = document.createElement('div');
    popup.id = 'policyPopup';
    popup.style.position = 'fixed';
    popup.style.left = `${left}px`;
    popup.style.top = `${top}px`;
    popup.style.width = `${popupWidth}px`;
    popup.style.height = `${popupHeight}px`;
    popup.style.backgroundColor = '#fff';
    popup.style.border = '2px solid #000';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    popup.style.zIndex = '10000';
    popup.style.padding = '20px';
    popup.style.overflowY = 'auto';

    //팝업 내용 추가
    popup.innerHTML = `
        <div style="text-align: right;">
            <button id="closePopup" style="background: none; border: none; font-size: 20px; cursor: pointer;">&times;</button>
        </div>
        <div style="padding: 10px;">
            ${content}
        </div>
    `;

    //팝업 닫기 버튼 이벤트
    popup.querySelector('#closePopup').addEventListener('click', () => {
        document.querySelector('#policyPopup').remove();
    });

    //팝업을 body에 추가
    document.body.appendChild(popup);
}
