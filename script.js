// User data and state
let userData = {
    totalBalance: 0,
    todayEarnings: 0,
    tasksCompleted: 0,
    hasInvested: false,
    lastWithdrawalDate: null,
    lastDailyEarningDate: null
};

// DOM Elements
const investNowBtn = document.getElementById('investNowBtn');
const selectPlanBtn = document.getElementById('selectPlanBtn');
const withdrawBtn = document.getElementById('withdrawBtn');
const confirmInvestBtn = document.getElementById('confirmInvestBtn');
const confirmWithdrawBtn = document.getElementById('confirmWithdrawBtn');
const taskButtons = document.querySelectorAll('.task-btn');
const investmentModal = document.getElementById('investmentModal');
const withdrawalModal = document.getElementById('withdrawalModal');
const closeButtons = document.querySelectorAll('.close');

// Update dashboard display
function updateDashboard() {
    document.getElementById('totalBalance').textContent = `₹${userData.totalBalance}`;
    document.getElementById('todayEarnings').textContent = `₹${userData.todayEarnings}`;
    document.getElementById('tasksCompleted').textContent = userData.tasksCompleted;
    document.getElementById('withdrawalBalance').textContent = `₹${userData.totalBalance}`;
}

// Check for daily earnings
function checkDailyEarnings() {
    const today = new Date().toDateString();
    
    // If user has invested and hasn't received today's earnings yet
    if (userData.hasInvested && userData.lastDailyEarningDate !== today) {
        userData.totalBalance += 60;
        userData.todayEarnings += 60;
        userData.lastDailyEarningDate = today;
        updateDashboard();
        
        // Show notification
        alert('Aaj ke ₹60 aapke account mein add kar diye gaye hain!');
    }
}

// Initialize the app
function init() {
    // Load user data from localStorage if available
    const savedData = localStorage.getItem('profitEarnUserData');
    if (savedData) {
        userData = JSON.parse(savedData);
    }
    
    updateDashboard();
    checkDailyEarnings();
    
    // Set up event listeners
    investNowBtn.addEventListener('click', () => {
        investmentModal.style.display = 'block';
    });
    
    selectPlanBtn.addEventListener('click', () => {
        investmentModal.style.display = 'block';
    });
    
    confirmInvestBtn.addEventListener('click', () => {
        if (!userData.hasInvested) {
            userData.hasInvested = true;
            userData.lastDailyEarningDate = new Date().toDateString();
            alert('Aapne successfully ₹500 invest kar diye hain! Ab aap roz ₹60 kamayeinge.');
            investmentModal.style.display = 'none';
            saveUserData();
        } else {
            alert('Aap pehle hi investment kar chuke hain!');
        }
    });
    
    withdrawBtn.addEventListener('click', () => {
        if (userData.totalBalance > 0) {
            withdrawalModal.style.display = 'block';
        } else {
            alert('Withdrawal ke liye aapke account mein paise nahi hain!');
        }
    });
    
    confirmWithdrawBtn.addEventListener('click', () => {
        if (userData.totalBalance > 0) {
            alert(`Aapke ₹${userData.totalBalance} aapke bank account mein transfer kar diye gaye hain!`);
            userData.totalBalance = 0;
            userData.todayEarnings = 0;
            updateDashboard();
            withdrawalModal.style.display = 'none';
            saveUserData();
        }
    });
    
    // Task completion
    taskButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (userData.hasInvested) {
                const reward = parseInt(this.getAttribute('data-reward'));
                userData.totalBalance += reward;
                userData.todayEarnings += reward;
                userData.tasksCompleted++;
                updateDashboard();
                this.textContent = 'Task Completed!';
                this.disabled = true;
                this.style.backgroundColor = '#95a5a6';
                saveUserData();
                
                alert(`Aapne task complete kiya! ₹${reward} aapke account mein add kar diye gaye hain.`);
            } else {
                alert('Task complete karne ke liye pehle investment karein!');
            }
        });
    });
    
    // Close modals
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            investmentModal.style.display = 'none';
            withdrawalModal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === investmentModal) {
            investmentModal.style.display = 'none';
        }
        if (event.target === withdrawalModal) {
            withdrawalModal.style.display = 'none';
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Save user data to localStorage
function saveUserData() {
    localStorage.setItem('profitEarnUserData', JSON.stringify(userData));
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);