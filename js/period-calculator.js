// Period Calculator JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const form = document.getElementById('periodCalculatorForm');
    const lastPeriodDateInput = document.getElementById('lastPeriodDate');
    const cycleLengthSlider = document.getElementById('cycleLength');
    const periodLengthSlider = document.getElementById('periodLength');
    const cycleLengthValue = document.getElementById('cycleLengthValue');
    const periodLengthValue = document.getElementById('periodLengthValue');
    const flowOptions = document.querySelectorAll('.flow-option');
    const flowTypeInput = document.getElementById('flowType');
    
    const resultsPlaceholder = document.getElementById('resultsPlaceholder');
    const resultsContent = document.getElementById('resultsContent');
    const lastUpdated = document.getElementById('lastUpdated');
    
    // Prediction elements
    const nextPeriodRange = document.getElementById('nextPeriodRange');
    const daysUntilNext = document.getElementById('daysUntilNext');
    const ovulationDate = document.getElementById('ovulationDate');
    const fertileWindow = document.getElementById('fertileWindow');
    const pmsWindow = document.getElementById('pmsWindow');
    
    // Summary elements
    const summaryCycleLength = document.getElementById('summaryCycleLength');
    const summaryPeriodLength = document.getElementById('summaryPeriodLength');
    const summaryFlowType = document.getElementById('summaryFlowType');
    
    // Recommendation elements
    const recommendationText = document.getElementById('recommendationText');
    const flowTypeSpan = recommendationText.querySelector('.flow-type');
    const productCard = document.getElementById('productCard');
    
    // Set default date to today
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    lastPeriodDateInput.value = formattedDate;
    lastPeriodDateInput.max = formattedDate;
    
    // Initialize slider values
    updateSliderValue(cycleLengthSlider, cycleLengthValue, 'days');
    updateSliderValue(periodLengthSlider, periodLengthValue, 'days');
    
    // Slider event listeners
    cycleLengthSlider.addEventListener('input', () => {
        updateSliderValue(cycleLengthSlider, cycleLengthValue, 'days');
    });
    
    periodLengthSlider.addEventListener('input', () => {
        updateSliderValue(periodLengthSlider, periodLengthValue, 'days');
    });
    
    // Flow type selection
    flowOptions.forEach(option => {
        option.addEventListener('click', () => {
            flowOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            const flowType = option.getAttribute('data-flow');
            flowTypeInput.value = flowType;
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const lastPeriod = new Date(lastPeriodDateInput.value);
        const cycleLength = parseInt(cycleLengthSlider.value);
        const periodLength = parseInt(periodLengthSlider.value);
        const flowType = flowTypeInput.value;
        
        // Validate date
        if (!lastPeriod || isNaN(lastPeriod.getTime())) {
            alert('Please select a valid date for your last period');
            return;
        }
        
        // Calculate predictions
        const predictions = calculatePredictions(lastPeriod, cycleLength, periodLength);
        
        // Update UI with results
        updateResults(predictions, cycleLength, periodLength, flowType);
        
        // Show results and hide placeholder
        resultsPlaceholder.style.display = 'none';
        resultsContent.style.display = 'block';
        
        // Update last updated time
        const now = new Date();
        lastUpdated.textContent = `Last updated: ${now.toLocaleDateString()} ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        
        // Scroll to results
        resultsContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    
    // Helper function to update slider value display
    function updateSliderValue(slider, valueElement, unit) {
        valueElement.textContent = `${slider.value} ${unit}`;
    }
    
    // Calculate predictions based on inputs
    function calculatePredictions(lastPeriod, cycleLength, periodLength) {
        const predictions = {};
        
        // Next period dates
        const nextPeriodStart = new Date(lastPeriod);
        nextPeriodStart.setDate(nextPeriodStart.getDate() + cycleLength);
        
        const nextPeriodEnd = new Date(nextPeriodStart);
        nextPeriodEnd.setDate(nextPeriodEnd.getDate() + periodLength - 1);
        
        predictions.nextPeriod = {
            start: nextPeriodStart,
            end: nextPeriodEnd
        };
        
        // Days until next period
        const today = new Date();
        const timeDiff = nextPeriodStart.getTime() - today.getTime();
        predictions.daysUntilNext = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        // Ovulation date (typically 14 days before next period)
        const ovulation = new Date(nextPeriodStart);
        ovulation.setDate(ovulation.getDate() - 14);
        predictions.ovulation = ovulation;
        
        // Fertile window (5 days before ovulation to ovulation day)
        const fertileStart = new Date(ovulation);
        fertileStart.setDate(fertileStart.getDate() - 4);
        
        const fertileEnd = new Date(ovulation);
        predictions.fertileWindow = {
            start: fertileStart,
            end: fertileEnd
        };
        
        // PMS window (3-5 days before period)
        const pmsStart = new Date(nextPeriodStart);
        pmsStart.setDate(pmsStart.getDate() - 5);
        
        const pmsEnd = new Date(nextPeriodStart);
        pmsEnd.setDate(pmsEnd.getDate() - 1);
        predictions.pmsWindow = {
            start: pmsStart,
            end: pmsEnd
        };
        
        return predictions;
    }
    
    // Update results UI
    function updateResults(predictions, cycleLength, periodLength, flowType) {
        // Format dates
        const formatDate = (date) => {
            return date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
        };
        
        const formatDateRange = (start, end) => {
            if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
                return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { day: 'numeric', year: 'numeric' })}`;
            } else {
                return `${formatDate(start)} - ${formatDate(end)}`;
            }
        };
        
        // Update predictions
        nextPeriodRange.textContent = formatDateRange(predictions.nextPeriod.start, predictions.nextPeriod.end);
        daysUntilNext.textContent = `(${predictions.daysUntilNext} days away)`;
        ovulationDate.textContent = formatDate(predictions.ovulation);
        fertileWindow.textContent = formatDateRange(predictions.fertileWindow.start, predictions.fertileWindow.end);
        pmsWindow.textContent = formatDateRange(predictions.pmsWindow.start, predictions.pmsWindow.end);
        
        // Update summary
        summaryCycleLength.textContent = cycleLength;
        summaryPeriodLength.textContent = periodLength;
        summaryFlowType.textContent = flowType.charAt(0).toUpperCase() + flowType.slice(1);
        
        // Update recommendation
        flowTypeSpan.textContent = flowType;
        updateProductRecommendation(flowType);
    }
    
    // Update product recommendation based on flow type
    function updateProductRecommendation(flowType) {
        let productData = {};
        
        switch(flowType) {
            case 'light':
                productData = {
                    name: 'FloCare Panty Liners',
                    desc: '180mm ultra-thin for light days & daily freshness',
                    image: 'images/flcare.png',
                    specs: ['180mm', '2mm thin', '20 liners'],
                    link: 'products.html#liner'
                };
                break;
            case 'medium':
                productData = {
                    name: 'FloCare Day Wear',
                    desc: '300mm all-day comfort with reliable protection',
                    image: 'images/flcare4.png',
                    specs: ['300mm', '8-hour', '10 pads'],
                    link: 'products.html#day'
                };
                break;
            case 'heavy':
                productData = {
                    name: 'FloCare Night Wear',
                    desc: '320mm overnight protection for heavy flow days',
                    image: 'images/flcarewhite2.png',
                    specs: ['320mm', '8-hour', '8 pads'],
                    link: 'products.html#night'
                };
                break;
        }
        
        // Update product card
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${productData.image}" alt="${productData.name}">
            </div>
            <div class="product-info">
                <h5>${productData.name}</h5>
                <p>${productData.desc}</p>
                <div class="product-specs">
                    <span class="spec"><i class="fas fa-ruler"></i> ${productData.specs[0]}</span>
                    <span class="spec"><i class="fas fa-clock"></i> ${productData.specs[1]}</span>
                    <span class="spec"><i class="fas fa-box"></i> ${productData.specs[2]}</span>
                </div>
                <a href="${productData.link}" class="btn-view-product">
                    View Product <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
    }
    
    // Reminder buttons
    document.querySelectorAll('.btn-reminder').forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            setReminder(type);
        });
    });
    
    // Set reminder function
    function setReminder(type) {
        const reminderText = type === 'period' 
            ? 'Your next period reminder has been set!' 
            : 'Your PMS reminder has been set!';
        
        showNotification(reminderText);
        
        // In a real app, you would use the Notification API or a backend service
        // For now, we'll just show a notification
    }
    
    // Save results
    document.getElementById('saveResults').addEventListener('click', function() {
        // In a real app, this would save to localStorage or a backend
        showNotification('Results saved successfully!');
    });
    
    // Print results
    document.getElementById('printResults').addEventListener('click', function() {
        window.print();
    });
    
    // Reset calculator
    document.getElementById('resetCalculator').addEventListener('click', function() {
        form.reset();
        flowOptions.forEach(opt => opt.classList.remove('active'));
        document.querySelector('.flow-option[data-flow="medium"]').classList.add('active');
        flowTypeInput.value = 'medium';
        updateSliderValue(cycleLengthSlider, cycleLengthValue, 'days');
        updateSliderValue(periodLengthSlider, periodLengthValue, 'days');
        
        resultsPlaceholder.style.display = 'block';
        resultsContent.style.display = 'none';
        
        showNotification('Calculator has been reset');
    });
    
    // Notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: var(--primary-purple);
            color: white;
            border-radius: 8px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize with default values
    const initialPredictions = calculatePredictions(
        new Date(lastPeriodDateInput.value),
        parseInt(cycleLengthSlider.value),
        parseInt(periodLengthSlider.value)
    );
    updateResults(initialPredictions, 
        parseInt(cycleLengthSlider.value),
        parseInt(periodLengthSlider.value),
        flowTypeInput.value
    );
});