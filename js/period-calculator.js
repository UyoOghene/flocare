// // Period Calculator Logic
// document.addEventListener("DOMContentLoaded", function() {
//     // Set default date for last period input (14 days ago)
//     const lastPeriodInput = document.getElementById("lastPeriod");
//     const today = new Date();
//     const twoWeeksAgo = new Date(today);
//     twoWeeksAgo.setDate(today.getDate() - 14);
    
//     const formatDateForInput = (date) => {
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//     };
    
//     lastPeriodInput.value = formatDateForInput(twoWeeksAgo);
//     lastPeriodInput.max = formatDateForInput(today);
    
//     // Update range value displays
//     const cycleLengthSlider = document.getElementById("cycleLength");
//     const cycleLengthValue = document.getElementById("cycleLengthValue");
//     const periodLengthSlider = document.getElementById("periodLength");
//     const periodLengthValue = document.getElementById("periodLengthValue");
    
//     cycleLengthSlider.addEventListener("input", function() {
//         cycleLengthValue.textContent = this.value;
//     });
    
//     periodLengthSlider.addEventListener("input", function() {
//         periodLengthValue.textContent = this.value;
//     });
    
//     // Flow type selection
//     const flowOptions = document.querySelectorAll(".flow-option");
//     const flowTypeInput = document.getElementById("flowType");
    
//     flowOptions.forEach(option => {
//         option.addEventListener("click", function() {
//             // Remove active class from all options
//             flowOptions.forEach(opt => opt.classList.remove("active"));
//             // Add active class to clicked option
//             this.classList.add("active");
//             // Update hidden input value
//             const flowValue = this.getAttribute("data-value");
//             flowTypeInput.value = flowValue;
//         });
//     });
    
//     // Period Calculator Form Submission
//     const periodCalculatorForm = document.getElementById("periodCalculator");
//     const resultsContainer = document.getElementById("resultsContainer");
//     const resultsContent = document.getElementById("resultsContent");
//     const resultsPlaceholder = document.querySelector(".results-placeholder");
    
//     periodCalculatorForm.addEventListener("submit", function(e) {
//         e.preventDefault();
        
//         // Get form values
//         const lastPeriod = new Date(lastPeriodInput.value);
//         const cycleLength = parseInt(cycleLengthSlider.value);
//         const periodLength = parseInt(periodLengthSlider.value);
//         const flowType = flowTypeInput.value;
        
//         // Calculate cycle dates
//         const nextPeriodStart = new Date(lastPeriod);
//         nextPeriodStart.setDate(lastPeriod.getDate() + cycleLength);
        
//         const nextPeriodEnd = new Date(nextPeriodStart);
//         nextPeriodEnd.setDate(nextPeriodStart.getDate() + periodLength - 1);
        
//         // Calculate ovulation (typically 14 days before next period)
//         const ovulationDate = new Date(nextPeriodStart);
//         ovulationDate.setDate(nextPeriodStart.getDate() - 14);
        
//         // Calculate fertile window (5 days before ovulation including ovulation day)
//         const fertileStart = new Date(ovulationDate);
//         fertileStart.setDate(ovulationDate.getDate() - 4);
        
//         const fertileEnd = new Date(ovulationDate);
        
//         // Calculate PMS window (4 days before next period)
//         const pmsStart = new Date(nextPeriodStart);
//         pmsStart.setDate(nextPeriodStart.getDate() - 4);
        
//         const pmsEnd = new Date(nextPeriodStart);
//         pmsEnd.setDate(nextPeriodStart.getDate() - 1);
        
//         // Calculate days until next period
//         const today = new Date();
//         const timeDiff = nextPeriodStart.getTime() - today.getTime();
//         const daysUntilNext = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
//         // Format dates for display
//         const formatDateDisplay = (date) => {
//             const options = { month: 'long', day: 'numeric', year: 'numeric' };
//             return date.toLocaleDateString('en-US', options);
//         };
        
//         const formatDateRange = (startDate, endDate) => {
//             if (startDate.getMonth() === endDate.getMonth()) {
//                 return `${startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { day: 'numeric, year: 'numeric' })}`;
//             } else {
//                 return `${startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric, year: 'numeric' })}`;
//             }
//         };
        
//         // Update results display
//         document.getElementById("nextPeriodDate").textContent = formatDateRange(nextPeriodStart, nextPeriodEnd);
//         document.getElementById("daysUntilNext").textContent = daysUntilNext;
//         document.getElementById("ovulationDate").textContent = formatDateDisplay(ovulationDate);
//         document.getElementById("fertileWindow").textContent = formatDateRange(fertileStart, fertileEnd);
//         document.getElementById("pmsWindow").textContent = formatDateRange(pmsStart, pmsEnd);
        
//         document.getElementById("cycleLengthResult").textContent = cycleLength;
//         document.getElementById("periodLengthResult").textContent = periodLength;
//         document.getElementById("flowTypeResult").textContent = flowType.charAt(0).toUpperCase() + flowType.slice(1);
//         document.getElementById("recommendedFlowType").textContent = flowType;
        
//         // Generate product recommendation based on flow type
//         const productRecommendation = document.getElementById("productRecommendation");
//         let recommendationHTML = "";
        
//         if (flowType === "light") {
//             recommendationHTML = `
//                 <div class="recommended-product-card">
//                     <div class="product-reco-image liner-pad-small"></div>
//                     <div class="product-reco-info">
//                         <h4>FloCare Panty Liners</h4>
//                         <p>180mm • 20 liners per pack</p>
//                         <p class="reco-desc">Perfect for light flow days and everyday freshness.</p>
//                         <a href="products.html#liner" class="btn btn-small">View Product</a>
//                     </div>
//                 </div>
//             `;
//         } else if (flowType === "medium") {
//             recommendationHTML = `
//                 <div class="recommended-product-card">
//                     <div class="product-reco-image day-pad-small"></div>
//                     <div class="product-reco-info">
//                         <h4>FloCare Day Wear</h4>
//                         <p>300mm • 10 pads per pack</p>
//                         <p class="reco-desc">Comfortable all-day protection for medium flow.</p>
//                         <a href="products.html#day" class="btn btn-small">View Product</a>
//                     </div>
//                 </div>
//             `;
//         } else {
//             recommendationHTML = `
//                 <div class="recommended-product-card">
//                     <div class="product-reco-image night-pad-small"></div>
//                     <div class="product-reco-info">
//                         <h4>FloCare Night Wear</h4>
//                         <p>320mm • 8 pads per pack</p>
//                         <p class="reco-desc">Maximum absorption for heavy flow days and overnight protection.</p>
//                         <a href="products.html#night" class="btn btn-small">View Product</a>
//                     </div>
//                 </div>
//             `;
//         }
        
//         productRecommendation.innerHTML = recommendationHTML;
        
//         // Show results and hide placeholder
//         resultsPlaceholder.style.display = "none";
//         resultsContent.style.display = "block";
        
//         // Scroll to results
//         resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
//         // Generate calendar visualization
//         generateCalendarVisualization(lastPeriod, nextPeriodStart, cycleLength);
//     });
    
//     // Set Reminder Button
//     const setReminderBtn = document.getElementById("setReminder");
//     if (setReminderBtn) {
//         setReminderBtn.addEventListener("click", function() {
//             const nextPeriodDate = document.getElementById("nextPeriodDate").textContent;
            
//             if (Notification.permission === "granted") {
//                 scheduleReminder(nextPeriodDate);
//             } else if (Notification.permission !== "denied") {
//                 Notification.requestPermission().then(permission => {
//                     if (permission === "granted") {
//                         scheduleReminder(nextPeriodDate);
//                     }
//                 });
//             }
            
//             // Show confirmation
//             const originalText = this.innerHTML;
//             this.innerHTML = '<i class="fas fa-check"></i> Reminder Set!';
//             this.style.backgroundColor = "var(--primary-green)";
            
//             setTimeout(() => {
//                 this.innerHTML = originalText;
//                 this.style.backgroundColor = "";
//             }, 3000);
//         });
//     }
    
//     // Save Results Button
//     const saveResultsBtn = document.getElementById("saveResults");
//     if (saveResultsBtn) {
//         saveResultsBtn.addEventListener("click", function() {
//             // In a real app, this would save to a database or localStorage
//             const originalText = this.innerHTML;
//             this.innerHTML = '<i class="fas fa-check"></i> Saved!';
//             this.style.backgroundColor = "var(--primary-green)";
//             this.style.color = "var(--white)";
            
//             setTimeout(() => {
//                 this.innerHTML = originalText;
//                 this.style.backgroundColor = "";
//                 this.style.color = "";
//             }, 3000);
//         });
//     }
    
//     // Generate calendar visualization
//     function generateCalendarVisualization(lastPeriod, nextPeriodStart, cycleLength) {
//         const calendarDays = document.querySelector(".calendar-days");
//         calendarDays.innerHTML = "";
        
//         // Create days for a 28-day cycle visualization
//         for (let i = 1; i <= 28; i++) {
//             const dayElement = document.createElement("div");
//             dayElement.className = "calendar-day";
//             dayElement.textContent = i;
            
//             // Mark period days (first 5 days)
//             if (i <= 5) {
//                 dayElement.classList.add("period-day");
//             }
            
//             // Mark ovulation day (day 14)
//             if (i === 14) {
//                 dayElement.classList.add("ovulation-day");
//             }
            
//             // Mark fertile window (days 10-14)
//             if (i >= 10 && i <= 14) {
//                 dayElement.classList.add("fertile-day");
//             }
            
//             // Mark PMS days (days 24-28)
//             if (i >= 24) {
//                 dayElement.classList.add("pms-day");
//             }
            
//             calendarDays.appendChild(dayElement);
//         }
//     }
    
//     // Schedule reminder notification
//     function scheduleReminder(nextPeriodDate) {
//         // In a real app, this would use the Web Notifications API more thoroughly
//         if (!("Notification" in window)) {
//             alert("This browser does not support desktop notifications");
//             return;
//         }
        
//         // Show immediate notification for demo purposes
//         const notification = new Notification("FloCare Period Reminder", {
//             body: `Your next period is expected around ${nextPeriodDate}. Time to stock up on FloCare pads!`,
//             icon: "https://cdn-icons-png.flaticon.com/512/3067/3067256.png"
//         });
        
//         notification.onclick = function() {
//             window.focus();
//             this.close();
//         };
//     }
    
//     // Add CSS for period calculator page
//     const style = document.createElement('style');
//     style.textContent = `
//         .page-hero {
//             padding-top: 140px;
//             padding-bottom: 60px;
//             background: linear-gradient(135deg, var(--light-pink) 0%, var(--light-purple) 100%);
//         }
        
//         .period-hero .hero-content {
//             flex-direction: column;
//             text-align: center;
//         }
        
//         .calendar-illustration {
//             width: 300px;
//             margin: 0 auto;
//         }
        
//         .calendar {
//             background-color: var(--white);
//             border-radius: var(--border-radius);
//             padding: 20px;
//             box-shadow: var(--shadow);
//         }
        
//         .calendar-header {
//             text-align: center;
//             margin-bottom: 20px;
//         }
        
//         .calendar-header h3 {
//             color: var(--primary-purple);
//             margin-bottom: 5px;
//         }
        
//         .calendar-days {
//             display: grid;
//             grid-template-columns: repeat(7, 1fr);
//             gap: 5px;
//             margin-bottom: 20px;
//         }
        
//         .calendar-day {
//             width: 30px;
//             height: 30px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             border-radius: 50%;
//             font-size: 0.8rem;
//             font-weight: 500;
//         }
        
//         .period-day {
//             background-color: rgba(156, 39, 176, 0.2);
//             color: var(--primary-purple);
//         }
        
//         .ovulation-day {
//             background-color: rgba(76, 175, 125, 0.3);
//             color: var(--primary-green);
//             font-weight: bold;
//         }
        
//         .fertile-day {
//             background-color: rgba(248, 187, 208, 0.3);
//         }
        
//         .pms-day {
//             background-color: rgba(224, 224, 224, 0.5);
//         }
        
//         .cycle-info {
//             display: flex;
//             justify-content: center;
//             gap: 15px;
//             flex-wrap: wrap;
//         }
        
//         .cycle-phase {
//             display: flex;
//             align-items: center;
//             gap: 5px;
//             font-size: 0.8rem;
//         }
        
//         .phase-color {
//             width: 12px;
//             height: 12px;
//             border-radius: 50%;
//         }
        
//         .phase-color.period {
//             background-color: rgba(156, 39, 176, 0.5);
//         }
        
//         .phase-color.fertile {
//             background-color: rgba(248, 187, 208, 0.5);
//         }
        
//         .phase-color.ovulation {
//             background-color: rgba(76, 175, 125, 0.5);
//         }
        
//         .calculator-section {
//             padding: 80px 0;
//             background-color: var(--light-gray);
//         }
        
//         .calculator-container {
//             display: flex;
//             gap: 40px;
//             margin-bottom: 60px;
//             flex-wrap: wrap;
//         }
        
//         .calculator-form, .calculator-results {
//             flex: 1;
//             min-width: 300px;
//             background-color: var(--white);
//             border-radius: var(--border-radius);
//             padding: 30px;
//             box-shadow: var(--shadow);
//         }
        
//         .calculator-form h2 {
//             color: var(--primary-purple);
//             margin-bottom: 10px;
//         }
        
//         .calculator-form p {
//             color: var(--text-light);
//             margin-bottom: 25px;
//         }
        
//         .form-group {
//             margin-bottom: 25px;
//         }
        
//         .form-group label {
//             display: flex;
//             align-items: center;
//             gap: 10px;
//             margin-bottom: 10px;
//             font-weight: 500;
//             color: var(--dark-gray);
//         }
        
//         .form-group label i {
//             color: var(--primary-purple);
//         }
        
//         .form-group input[type="date"] {
//             width: 100%;
//             padding: 12px 15px;
//             border: 1px solid var(--medium-gray);
//             border-radius: var(--border-radius-sm);
//             font-family: 'Poppins', sans-serif;
//             font-size: 1rem;
//         }
        
//         .range-container {
//             margin-bottom: 10px;
//         }
        
//         .range-value {
//             text-align: center;
//             font-weight: 600;
//             color: var(--primary-purple);
//             margin-top: 10px;
//         }
        
//         input[type="range"] {
//             width: 100%;
//             height: 8px;
//             border-radius: 5px;
//             background: var(--light-gray);
//             outline: none;
//         }
        
//         input[type="range"]::-webkit-slider-thumb {
//             width: 22px;
//             height: 22px;
//             border-radius: 50%;
//             background: var(--primary-purple);
//             cursor: pointer;
//             -webkit-appearance: none;
//         }
        
//         .range-labels {
//             display: flex;
//             justify-content: space-between;
//             font-size: 0.8rem;
//             color: var(--text-light);
//             margin-top: 5px;
//         }
        
//         .flow-options {
//             display: flex;
//             gap: 15px;
//             margin-top: 10px;
//         }
        
//         .flow-option {
//             flex: 1;
//             text-align: center;
//             padding: 15px 10px;
//             border: 2px solid var(--medium-gray);
//             border-radius: var(--border-radius-sm);
//             cursor: pointer;
//             transition: var(--transition);
//         }
        
//         .flow-option.active {
//             border-color: var(--primary-purple);
//             background-color: var(--light-purple);
//         }
        
//         .flow-icon {
//             width: 40px;
//             height: 40px;
//             border-radius: 50%;
//             margin: 0 auto 10px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 1.2rem;
//             color: var(--white);
//         }
        
//         .light-flow {
//             background-color: #81C784;
//         }
        
//         .medium-flow {
//             background-color: #4FC3F7;
//         }
        
//         .heavy-flow {
//             background-color: #BA68C8;
//         }
        
//         .btn-block {
//             width: 100%;
//             display: block;
//         }
        
//         .results-placeholder {
//             text-align: center;
//             padding: 40px 20px;
//         }
        
//         .placeholder-icon {
//             width: 80px;
//             height: 80px;
//             border-radius: 50%;
//             background-color: var(--light-purple);
//             color: var(--primary-purple);
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 2rem;
//             margin: 0 auto 20px;
//         }
        
//         .prediction-card {
//             display: flex;
//             align-items: center;
//             gap: 15px;
//             padding: 20px;
//             background-color: var(--light-gray);
//             border-radius: var(--border-radius-sm);
//             margin-bottom: 15px;
//             border-left: 4px solid;
//         }
        
//         .next-period {
//             border-left-color: var(--primary-purple);
//         }
        
//         .ovulation {
//             border-left-color: var(--primary-green);
//         }
        
//         .fertile-window {
//             border-left-color: var(--baby-pink);
//         }
        
//         .pms {
//             border-left-color: #FFB74D;
//         }
        
//         .prediction-icon {
//             width: 50px;
//             height: 50px;
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 1.2rem;
//             color: var(--white);
//         }
        
//         .next-period .prediction-icon {
//             background-color: var(--primary-purple);
//         }
        
//         .ovulation .prediction-icon {
//             background-color: var(--primary-green);
//         }
        
//         .fertile-window .prediction-icon {
//             background-color: var(--baby-pink);
//         }
        
//         .pms .prediction-icon {
//             background-color: #FFB74D;
//         }
        
//         .prediction-info h3 {
//             margin-bottom: 5px;
//             font-size: 1.1rem;
//         }
        
//         .prediction-date {
//             font-weight: 600;
//             color: var(--dark-gray);
//             margin-bottom: 5px;
//         }
        
//         .prediction-desc {
//             font-size: 0.9rem;
//             color: var(--text-light);
//         }
        
//         .cycle-summary {
//             margin-top: 30px;
//             padding: 20px;
//             background-color: var(--light-gray);
//             border-radius: var(--border-radius-sm);
//         }
        
//         .summary-stats {
//             display: flex;
//             justify-content: space-around;
//             margin: 20px 0;
//         }
        
//         .stat {
//             text-align: center;
//         }
        
//         .stat-value {
//             display: block;
//             font-size: 2rem;
//             font-weight: 700;
//             color: var(--primary-purple);
//             line-height: 1;
//         }
        
//         .stat-label {
//             font-size: 0.9rem;
//             color: var(--text-light);
//         }
        
//         .product-recommendation {
//             margin-top: 25px;
//             padding-top: 25px;
//             border-top: 1px solid var(--medium-gray);
//         }
        
//         .product-recommendation h4 {
//             display: flex;
//             align-items: center;
//             gap: 10px;
//             margin-bottom: 10px;
//             color: var(--primary-purple);
//         }
        
//         .product-recommendation h4 i {
//             color: var(--primary-green);
//         }
        
//         .recommended-product-card {
//             display: flex;
//             align-items: center;
//             gap: 15px;
//             padding: 15px;
//             background-color: var(--white);
//             border-radius: var(--border-radius-sm);
//             margin-top: 15px;
//             border: 1px solid var(--medium-gray);
//         }
        
//         .product-reco-image {
//             width: 60px;
//             height: 60px;
//             border-radius: 10px;
//         }
        
//         .liner-pad-small {
//             background-color: var(--light-pink);
//         }
        
//         .day-pad-small {
//             background-color: var(--light-green);
//         }
        
//         .night-pad-small {
//             background-color: var(--light-purple);
//         }
        
//         .product-reco-info h4 {
//             font-size: 1rem;
//             margin-bottom: 5px;
//             color: var(--primary-purple);
//         }
        
//         .product-reco-info p {
//             font-size: 0.85rem;
//             color: var(--text-light);
//             margin-bottom: 5px;
//         }
        
//         .reco-desc {
//             font-size: 0.8rem !important;
//             margin-bottom: 10px !important;
//         }
        
//         .btn-small {
//             padding: 8px 15px;
//             font-size: 0.8rem;
//         }
        
//         .results-actions {
//             display: flex;
//             gap: 15px;
//             margin-top: 25px;
//         }
        
//         .cycle-info-section {
//             margin-top: 60px;
//         }
        
//         .cycle-phases {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//             gap: 25px;
//             margin: 40px 0;
//         }
        
//         .phase {
//             text-align: center;
//             padding: 20px;
//             background-color: var(--white);
//             border-radius: var(--border-radius);
//             box-shadow: var(--shadow);
//         }
        
//         .phase-icon {
//             width: 70px;
//             height: 70px;
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             margin: 0 auto 15px;
//             font-size: 1.8rem;
//             color: var(--white);
//         }
        
//         .period-phase {
//             background-color: var(--primary-purple);
//         }
        
//         .follicular-phase {
//             background-color: #4FC3F7;
//         }
        
//         .ovulation-phase {
//             background-color: var(--primary-green);
//         }
        
//         .luteal-phase {
//             background-color: #FFB74D;
//         }
        
//         .phase h3 {
//             margin-bottom: 10px;
//             font-size: 1.3rem;
//         }
        
//         .product-tips {
//             margin-top: 50px;
//         }
        
//         .tips-grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//             gap: 25px;
//             margin-top: 30px;
//         }
        
//         .tip {
//             text-align: center;
//             padding: 25px 20px;
//             background-color: var(--white);
//             border-radius: var(--border-radius);
//             box-shadow: var(--shadow);
//         }
        
//         .tip-icon {
//             width: 60px;
//             height: 60px;
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             margin: 0 auto 15px;
//             font-size: 1.5rem;
//             color: var(--white);
//         }
        
//         .light-tip {
//             background-color: #81C784;
//         }
        
//         .medium-tip {
//             background-color: #4FC3F7;
//         }
        
//         .heavy-tip {
//             background-color: #BA68C8;
//         }
        
//         .tip h4 {
//             margin-bottom: 10px;
//             font-size: 1.2rem;
//         }
        
//         @media (max-width: 768px) {
//             .calculator-form, .calculator-results {
//                 min-width: 100%;
//             }
            
//             .results-actions {
//                 flex-direction: column;
//             }
            
//             .results-actions .btn {
//                 width: 100%;
//             }
//         }
//     `;
//     document.head.appendChild(style);
// });