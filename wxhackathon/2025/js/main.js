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
                svg.className = isInHero ? 'w-6 h-6 text-white' : 'w-6 h-6 text-gray-700';
            } else {
                // 메뉴 열림 - X 아이콘
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
                svg.className = isInHero ? 'w-6 h-6 text-white' : 'w-6 h-6 text-gray-700';
                
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
    const fileList = document.querySelector('.file-list');
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['.pdf', '.doc', '.docx', '.zip'];
    
    Array.from(files).forEach(file => {
        // Validate file size
        if (file.size > maxSize) {
            showNotification('파일 크기는 10MB 이하여야 합니다.', 'error');
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
            
            // Simulate form submission
            setTimeout(() => {
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Show success message
                showNotification('참가 신청이 성공적으로 제출되었습니다!', 'success');
                
                // Reset form
                this.reset();
                toggleRoleFields(''); // Hide all conditional fields
                
                // Clear file list
                const fileList = document.querySelector('.file-list');
                if (fileList) {
                    fileList.innerHTML = '';
                }
            }, 2000);
        });
    }
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