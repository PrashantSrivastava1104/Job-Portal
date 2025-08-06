let allJobs = [];
let allCompanies = [];

// Logo map for company logos
const logoMap = {
    'Google': 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    'Microsoft': 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    'Amazon': 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    'Facebook': 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png',
    'Meta': 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Meta_Platforms_Logo_2021.svg',
    'Apple': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    'Netflix': 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    'Tesla': 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg',
    'IBM': 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
    'Adobe': 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Adobe_Corporate_Logo.png',
    'Oracle': 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
    'Intel': 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg',
    'Walmart': 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg',
    'Infosys': 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Infosys_logo.svg',
    'TCS': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_Consultancy_Services_Logo.svg',
    'Accenture': 'https://upload.wikimedia.org/wikipedia/commons/5/50/Accenture_Logo.svg',
    'Capgemini': 'https://upload.wikimedia.org/wikipedia/commons/9/99/Capgemini_201x_logo.svg',
    'Wipro': 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Wipro_Primary_Logo_Color_RGB.svg',
    'Cognizant': 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Cognizant_logo_2022.svg',
    'HCL': 'https://upload.wikimedia.org/wikipedia/commons/5/5b/HCL_Technologies_Logo.svg',
    'Deloitte': 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Deloitte_Logo.png',
    'EY': 'https://upload.wikimedia.org/wikipedia/commons/6/6b/EY_logo_2019.svg',
    'KPMG': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/KPMG_logo.svg',
    'PwC': 'https://upload.wikimedia.org/wikipedia/commons/6/6b/PwC_logo.svg',
    
    // New companies added
    'Spotify': 'https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg',
    'Uber': 'https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg',
    'Airbnb': 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg',
    'LinkedIn': 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
    'Goldman Sachs': 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Goldman_Sachs_logo.svg',
    'Morgan Stanley': 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Morgan_Stanley_logo.svg',
    'Stripe': 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Stripe_logo%2C_revised_2016.svg',
    'Pfizer': 'https://upload.wikimedia.org/wikipedia/commons/2/23/Pfizer_logo.svg',
    'Moderna': 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Moderna_logo.svg',
    'Shopify': 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_black.svg',
    'McKinsey': 'https://upload.wikimedia.org/wikipedia/commons/8/86/McKinsey_%26_Company_logo.svg',
    'Boston Consulting Group': 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Boston_Consulting_Group_logo.svg',
    'Electronic Arts': 'https://upload.wikimedia.org/wikipedia/commons/2/20/Electronic_Arts_logo.svg',
    'Activision Blizzard': 'https://upload.wikimedia.org/wikipedia/commons/3/36/Activision_Blizzard_logo.svg',
    'Riot Games': 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Riot_Games_logo.svg',
    'General Motors': 'https://upload.wikimedia.org/wikipedia/commons/3/37/General_Motors_logo.svg',
    'Ford': 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg',
    'BMW': 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
    'NextEra Energy': 'https://upload.wikimedia.org/wikipedia/commons/8/8a/NextEra_Energy_logo.svg',
    'Disney': 'https://upload.wikimedia.org/wikipedia/commons/0/04/Disney_wordmark.svg',
    'Warner Bros': 'https://upload.wikimedia.org/wikipedia/commons/6/64/Warner_Bros_logo.svg',
    'Warner Bros Discovery': 'https://upload.wikimedia.org/wikipedia/commons/6/64/Warner_Bros_Discovery_logo.svg',
    'Berkshire Hathaway': 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Berkshire_Hathaway_logo.svg',
    'Johnson & Johnson': 'https://upload.wikimedia.org/wikipedia/commons/2/20/Johnson_%26_Johnson_logo.svg',
    'JPMorgan Chase': 'https://upload.wikimedia.org/wikipedia/commons/3/36/JP_Morgan_Chase_logo.svg',
};
function getLogoUrl(name) {
    if (!name) return '';
    for (const key in logoMap) {
        if (name.toLowerCase().includes(key.toLowerCase())) {
            return logoMap[key];
        }
    }
    return 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
}

function populateFilters(jobs) {
    // Get unique values for dropdowns
    const getUnique = (key) => [...new Set(jobs.map(j => j[key]).filter(Boolean))];
    const setOptions = (id, values, defaultOption = 'All') => {
        const sel = document.getElementById(id);
        if (!sel) return;
        
        sel.innerHTML = '';
        const defaultOpt = document.createElement('option');
        defaultOpt.value = '';
        defaultOpt.textContent = defaultOption;
        sel.appendChild(defaultOpt);
        
        values.forEach(val => {
            const opt = document.createElement('option');
            opt.value = val;
            opt.textContent = val;
            sel.appendChild(opt);
        });
    };
    
    // Populate basic filters
    setOptions('filter-flexibility', getUnique('flexibility'), 'All Types');
    setOptions('filter-location', getUnique('location'), 'All Locations');
    setOptions('filter-role', getUnique('role'), 'All Roles');
    setOptions('filter-company', getUnique('industry'), 'All Companies');
    
    // Set stipend and work hours max
    const stipendMax = Math.max(100000, ...jobs.map(j => parseInt(j.stipend)||0));
    const stipendSlider = document.getElementById('filter-stipend');
    if (stipendSlider) {
        stipendSlider.max = stipendMax;
        stipendSlider.value = 0;
        updateStipendValue(0);
    }
    
    const workHoursMax = Math.max(80, ...jobs.map(j => parseInt(j.work_hours)||0));
    const workHoursSlider = document.getElementById('filter-work-hours');
    if (workHoursSlider) {
        workHoursSlider.max = workHoursMax;
        workHoursSlider.value = 0;
        updateWorkHoursValue(0);
    }
}

function updateStipendValue(value) {
    const stipendValue = document.getElementById('stipend-value');
    if (stipendValue) {
        stipendValue.textContent = '$' + parseInt(value).toLocaleString();
    }
}

function updateWorkHoursValue(value) {
    const workHoursValue = document.getElementById('work-hours-value');
    if (workHoursValue) {
        workHoursValue.textContent = value + ' hours';
    }
}

function filterJobs(jobs) {
    // Get all filter values
    const filters = {
        flexibility: document.getElementById('filter-flexibility')?.value || '',
        location: document.getElementById('filter-location')?.value || '',
        role: document.getElementById('filter-role')?.value || '',
        company: document.getElementById('filter-company')?.value || '',
        stipend: parseInt(document.getElementById('filter-stipend')?.value) || 0,
        workHours: parseInt(document.getElementById('filter-work-hours')?.value) || 0,
        experience: document.getElementById('filter-experience')?.value || '',
        employmentType: document.getElementById('filter-employment-type')?.value || '',
        sortBy: document.getElementById('filter-sort')?.value || 'relevance',
        benefits: {
            healthInsurance: document.getElementById('filter-health-insurance')?.checked || false,
            remoteWork: document.getElementById('filter-remote-work')?.checked || false,
            flexibleHours: document.getElementById('filter-flexible-hours')?.checked || false,
            professionalDevelopment: document.getElementById('filter-professional-development')?.checked || false
        }
    };

    // Filter jobs based on selected criteria
    let filteredJobs = jobs.filter(job => {
        // Basic filters
        if (filters.flexibility && job.flexibility !== filters.flexibility) return false;
        if (filters.location && job.location !== filters.location) return false;
        if (filters.role && job.role !== filters.role) return false;
        if (filters.company && job.industry !== filters.company) return false;
        
        // Numeric filters
        if (filters.stipend > 0 && (!job.stipend || (parseInt(job.stipend.replace(/[^\d]/g, '')) || 0) < filters.stipend)) return false;
        if (filters.workHours > 0 && (parseInt(job.work_hours) || 0) < filters.workHours) return false;
        
        // Experience level (if available in job data)
        if (filters.experience && job.experience_level && job.experience_level !== filters.experience) return false;
        
        // Employment type (if available in job data)
        if (filters.employmentType && job.employment_type && job.employment_type !== filters.employmentType) return false;
        
        // Benefits filters (if available in job data)
        if (filters.benefits.remoteWork && job.location !== 'remote') return false;
        if (filters.benefits.flexibleHours && job.flexibility !== 'both') return false;
        
        return true;
    });

    // Sort results
    filteredJobs = sortJobs(filteredJobs, filters.sortBy);
    
    return filteredJobs;
}

function sortJobs(jobs, sortBy) {
    const sortedJobs = [...jobs];
    
    switch (sortBy) {
        case 'salary-high':
            return sortedJobs.sort((a, b) => {
                const aStipend = !a.stipend ? 0 : (parseInt(a.stipend.replace(/[^\d]/g, '')) || 0);
                const bStipend = !b.stipend ? 0 : (parseInt(b.stipend.replace(/[^\d]/g, '')) || 0);
                return bStipend - aStipend;
            });
        case 'salary-low':
            return sortedJobs.sort((a, b) => {
                const aStipend = !a.stipend ? 0 : (parseInt(a.stipend.replace(/[^\d]/g, '')) || 0);
                const bStipend = !b.stipend ? 0 : (parseInt(b.stipend.replace(/[^\d]/g, '')) || 0);
                return aStipend - bStipend;
            });
        case 'newest':
            return sortedJobs.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        case 'oldest':
            return sortedJobs.sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0));
        default:
            return sortedJobs; // relevance - keep original order
    }
}

function displayJobs(jobs) {
    const jobsList = document.getElementById('jobs-list');
    const resultsNumber = document.getElementById('results-number');
    
    jobsList.innerHTML = '';
    
    // Update results count
    if (resultsNumber) {
        resultsNumber.textContent = jobs.length;
    }
    
    if (jobs.length === 0) {
        jobsList.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #64748b;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3 style="margin-bottom: 0.5rem; color: #374151;">No jobs found</h3>
                <p>Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }
    
    jobs.forEach(job => {
        const companyName = job.name || job.company_name || job.company || job.employer || job.industry || '';
        const logoUrl = getLogoUrl(companyName);
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.tabIndex = 0;
        jobCard.style.cursor = 'pointer';
        jobCard.innerHTML = `
            <div class="job-title">${job.name}</div>
            <div class="role">${job.role || ''}</div>
            <div class="company"><img src="${logoUrl}" alt="Logo" class="inline-company-logo" /> ${job.industry || ''}</div>
            <div class="location">${job.location || ''}</div>
        `;
        jobCard.onclick = (e) => {
            const params = new URLSearchParams({
                name: job.name,
                role: job.role || '',
                industry: job.industry || '',
                location: job.location || '',
                job_description: job.job_description || '',
                stipend: job.stipend || '',
                work_hours: job.work_hours || '',
                reallocation_bonus: job.reallocation_bonus || '',
                contact_number: job.contact_number || '',
                flexibility: job.flexibility || '',
                logo: getLogoUrl(job.name || job.company_name || job.company || job.employer || job.industry || '')
            }).toString();
            window.location.href = `job-details.html?${params}`;
        };
        jobsList.appendChild(jobCard);
    });
    
    // Update filter summary
    updateFilterSummary();
}

function updateFilterSummary() {
    const filterSummary = document.getElementById('filter-summary');
    const filterSummaryTags = document.getElementById('filter-summary-tags');
    
    if (!filterSummary || !filterSummaryTags) return;
    
    const activeFilters = getActiveFilters();
    
    if (activeFilters.length === 0) {
        filterSummary.style.display = 'none';
        return;
    }
    
    filterSummary.style.display = 'flex';
    filterSummaryTags.innerHTML = '';
    
    activeFilters.forEach(filter => {
        const tag = document.createElement('span');
        tag.className = 'filter-summary-tag';
        tag.innerHTML = `
            ${filter.label}
            <i class="fas fa-times" onclick="removeFilter('${filter.type}', '${filter.value}')"></i>
        `;
        filterSummaryTags.appendChild(tag);
    });
}

function getActiveFilters() {
    const filters = [];
    
    // Check each filter type
    const filterTypes = [
        { id: 'filter-flexibility', label: 'Work Type' },
        { id: 'filter-location', label: 'Location' },
        { id: 'filter-role', label: 'Role' },
        { id: 'filter-company', label: 'Company' },
        { id: 'filter-experience', label: 'Experience' },
        { id: 'filter-employment-type', label: 'Employment Type' }
    ];
    
    filterTypes.forEach(filter => {
        const element = document.getElementById(filter.id);
        if (element && element.value) {
            filters.push({
                type: filter.id,
                value: element.value,
                label: `${filter.label}: ${element.value}`
            });
        }
    });
    
    // Check sliders
    const stipend = document.getElementById('filter-stipend')?.value;
    if (stipend && stipend > 0) {
        filters.push({
            type: 'filter-stipend',
            value: stipend,
            label: `Min Salary: $${parseInt(stipend).toLocaleString()}`
        });
    }
    
    const workHours = document.getElementById('filter-work-hours')?.value;
    if (workHours && workHours > 0) {
        filters.push({
            type: 'filter-work-hours',
            value: workHours,
            label: `Work Hours: ${workHours}h`
        });
    }
    
    // Check checkboxes
    const checkboxes = [
        { id: 'filter-health-insurance', label: 'Health Insurance' },
        { id: 'filter-remote-work', label: 'Remote Work' },
        { id: 'filter-flexible-hours', label: 'Flexible Hours' },
        { id: 'filter-professional-development', label: 'Professional Development' }
    ];
    
    checkboxes.forEach(checkbox => {
        const element = document.getElementById(checkbox.id);
        if (element && element.checked) {
            filters.push({
                type: checkbox.id,
                value: 'true',
                label: checkbox.label
            });
        }
    });
    
    return filters;
}

function removeFilter(type, value) {
    const element = document.getElementById(type);
    if (element) {
        if (element.type === 'checkbox') {
            element.checked = false;
        } else {
            element.value = '';
        }
    }
    
    // Re-apply filters
    const filteredJobs = filterJobs(allJobs);
    displayJobs(filteredJobs);
}

function applyFilterPreset(preset) {
    // Reset all filters first
    resetAllFilters();
    
    switch (preset) {
        case 'remote':
            document.getElementById('filter-location').value = 'remote';
            break;
        case 'high-salary':
            document.getElementById('filter-stipend').value = '50000';
            updateStipendValue(50000);
            break;
        case 'tech':
            document.getElementById('filter-role').value = 'software-engineer';
            break;
        case 'entry-level':
            document.getElementById('filter-experience').value = 'entry';
            break;
        case 'part-time':
            document.getElementById('filter-employment-type').value = 'part-time';
            break;
    }
    
    // Apply filters
    const filteredJobs = filterJobs(allJobs);
    displayJobs(filteredJobs);
}

function resetAllFilters() {
    // Reset dropdowns
    const dropdowns = [
        'filter-flexibility', 'filter-location', 'filter-role', 'filter-company',
        'filter-experience', 'filter-employment-type', 'filter-sort'
    ];
    
    dropdowns.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = '';
    });
    
    // Reset sliders
    const stipendSlider = document.getElementById('filter-stipend');
    if (stipendSlider) {
        stipendSlider.value = 0;
        updateStipendValue(0);
    }
    
    const workHoursSlider = document.getElementById('filter-work-hours');
    if (workHoursSlider) {
        workHoursSlider.value = 0;
        updateWorkHoursValue(0);
    }
    
    // Reset checkboxes
    const checkboxes = [
        'filter-health-insurance', 'filter-remote-work', 
        'filter-flexible-hours', 'filter-professional-development'
    ];
    
    checkboxes.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.checked = false;
    });
    
    // Clear preset tags
    document.querySelectorAll('.preset-tag').forEach(tag => {
        tag.classList.remove('active');
    });
}

function searchJobs(jobs) {
    const query = document.getElementById('search').value.toLowerCase();
    const filtered = jobs.filter(job =>
        (job.name && job.name.toLowerCase().includes(query)) ||
        (job.role && job.role.toLowerCase().includes(query)) ||
        (job.industry && job.industry.toLowerCase().includes(query)) ||
        (job.location && job.location.toLowerCase().includes(query)) ||
        (job.job_description && job.job_description.toLowerCase().includes(query)) ||
        (job.stipend && job.stipend.toLowerCase().includes(query)) ||
        (job.work_hours && job.work_hours !== '?' && job.work_hours.toLowerCase().includes(query)) ||
        (job.reallocation_bonus && job.reallocation_bonus.toLowerCase().includes(query)) ||
        (job.contact_number && job.contact_number.toLowerCase().includes(query)) ||
        (job.flexibility && job.flexibility.toLowerCase().includes(query))
    );
    displayJobs(filtered);
    // Scroll to jobs section after search
    const jobsSection = document.getElementById('jobs');
    if (jobsSection) {
        jobsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

async function fetchAndDisplayJobs() {
    try {
        console.log('Starting to fetch data...');
        
        // Get data from the companies endpoint
        const response = await fetch('/api/companies');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        console.log('Data length:', data.length);
        
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('No data received or data is not an array');
        }
        
        // Set jobs data
        allJobs = data;
        console.log('Set allJobs:', allJobs.length, 'jobs');
        
        // Extract companies from jobs data
        allCompanies = extractCompaniesFromJobs(data);
        console.log('Extracted companies:', allCompanies.length, 'companies');
        
        // Display jobs
        if (allJobs.length > 0) {
            displayJobs(allJobs);
            populateFilters(allJobs);
            
            // Set up search functionality
            const searchInput = document.getElementById('search');
            const searchButton = document.querySelector('.search-section button');
            
            if (searchInput) {
                // Remove keyup event for live search
                // Add Enter key support
                searchInput.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        searchJobs(allJobs);
                    }
                });
            }
            
            if (searchButton) {
                searchButton.onclick = () => searchJobs(allJobs);
            }
            
            // Set up enhanced filter functionality
            setupFilterEventListeners();
            
            // Set up preset filter buttons
            setupPresetFilters();
            
            // Set up filter summary clear button
            const clearFiltersSummary = document.getElementById('clear-filters-summary');
            if (clearFiltersSummary) {
                clearFiltersSummary.onclick = function() {
                    resetAllFilters();
                    const filtered = filterJobs(allJobs);
                    displayJobs(filtered);
                };
            }
        } else {
            const jobsList = document.getElementById('jobs-list');
            if (jobsList) {
                jobsList.innerHTML = '<p style="text-align: center; color: #64748b;">No jobs available at the moment.</p>';
            }
        }
        
        // Display companies
        if (allCompanies.length > 0) {
            displayCompanies(allCompanies);
        } else {
            const companiesList = document.getElementById('companies-list');
            if (companiesList) {
                companiesList.innerHTML = '<p style="text-align: center; color: #64748b;">No companies available at the moment.</p>';
            }
        }
        
        console.log('Data loading completed successfully');
        
    } catch (error) {
        console.error('Error in fetchAndDisplayJobs:', error);
        
        const jobsList = document.getElementById('jobs-list');
        const companiesList = document.getElementById('companies-list');
        
        if (jobsList) {
            jobsList.innerHTML = `<p style="text-align: center; color: #ef4444;">Failed to load jobs: ${error.message}</p>`;
        }
        
        if (companiesList) {
            companiesList.innerHTML = `<p style="text-align: center; color: #ef4444;">Failed to load companies: ${error.message}</p>`;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetchAndDisplayJobs();
    initScrollNavigation();
});

// Filter modal logic
const openFilterBtn = document.getElementById('open-filter-btn');
const filterModal = document.getElementById('filter-modal');
const closeFilterModal = document.getElementById('close-filter-modal');
if (openFilterBtn && filterModal && closeFilterModal) {
    openFilterBtn.onclick = () => {
        filterModal.style.display = 'flex';
    };
    closeFilterModal.onclick = () => {
        filterModal.style.display = 'none';
    };
    // Optional: close modal on outside click
    filterModal.onclick = (e) => {
        if (e.target === filterModal) filterModal.style.display = 'none';
    };
    // Reset filters logic
    const resetBtn = document.getElementById('reset-filters');
    if (resetBtn) {
        resetBtn.onclick = function() {
            // Clear all selects
            ['filter-flexibility','filter-location','filter-role'].forEach(id => {
                const sel = document.getElementById(id);
                if (sel) Array.from(sel.options).forEach(opt => opt.selected = false);
            });
            // Reset sliders to min
            const stipendSlider = document.getElementById('filter-stipend');
            const workHoursSlider = document.getElementById('filter-work-hours');
            if (stipendSlider) {
                stipendSlider.value = stipendSlider.min;
                document.getElementById('stipend-value').textContent = stipendSlider.value;
            }
            if (workHoursSlider) {
                workHoursSlider.value = workHoursSlider.min;
                document.getElementById('work-hours-value').textContent = workHoursSlider.value;
            }
            // Show all jobs and reset header
            displayJobs(allJobs);
            const jobsHeader = document.querySelector('.featured-jobs .section-header h2');
            if (jobsHeader) {
                jobsHeader.textContent = 'Featured Opportunities';
            }
        };
    }
}

// Function to get unique companies from jobs data
function extractCompaniesFromJobs(jobs) {
    console.log('Extracting companies from jobs:', jobs.length, 'jobs');
    
    const companiesMap = new Map();
    
    jobs.forEach((job, index) => {
        console.log(`Processing job ${index + 1}:`, job);
        
        // Handle the actual data structure from the database
        const companyName = job.name || job.company_name || job.company || job.employer;
        const location = job.location || job.city || 'Multiple Locations';
        const industry = job.industry || 'Technology';
        
        // Clean up stipend value - remove currency symbols and extract numbers
        let stipend = 50000; // default
        if (job.stipend) {
            const stipendStr = job.stipend.toString();
            const numbers = stipendStr.replace(/[^\d]/g, '');
            if (numbers) {
                stipend = parseInt(numbers);
            }
        }
        
        console.log(`Job ${index + 1} - Company: ${companyName}, Location: ${location}, Industry: ${industry}, Stipend: ${stipend}`);
        
        if (companyName) {
            if (!companiesMap.has(companyName)) {
                companiesMap.set(companyName, {
                    name: companyName,
                    location: location,
                    jobCount: 1,
                    avgStipend: stipend,
                    totalStipend: stipend,
                    industry: industry,
                    jobs: [job]
                });
                console.log(`Created new company: ${companyName}`);
            } else {
                const company = companiesMap.get(companyName);
                company.jobCount++;
                company.totalStipend += stipend;
                company.avgStipend = Math.round(company.totalStipend / company.jobCount);
                company.jobs.push(job);
                console.log(`Updated company: ${companyName}, now has ${company.jobCount} jobs`);
            }
        } else {
            console.log(`Job ${index + 1} has no company name`);
        }
    });
    
    const companies = Array.from(companiesMap.values());
    console.log('Final companies extracted:', companies);
    return companies;
}

// Function to display companies
function displayCompanies(companies) {
    console.log('Displaying companies:', companies);
    
    const companiesList = document.getElementById('companies-list');
    if (!companiesList) {
        console.error('Companies list element not found!');
        return;
    }
    
    companiesList.innerHTML = '';
    
    if (companies.length === 0) {
        console.log('No companies to display');
        companiesList.innerHTML = '<p style="text-align: center; color: #64748b; grid-column: 1 / -1;">No companies found.</p>';
        return;
    }
    
    console.log(`Displaying ${companies.length} companies`);
    
    companies.forEach((company, index) => {
        console.log(`Creating card for company ${index + 1}:`, company);
        
        const companyCard = document.createElement('div');
        companyCard.className = 'company-card';
        companyCard.tabIndex = 0;
        
        // Handle different data structures
        const companyName = company.name || company.company_name || company.industry || 'Company';
        const companyLocation = company.location || company.city || 'Multiple Locations';
        const jobCount = company.jobCount || company.jobs_count || 1;
        const avgSalary = company.avgStipend || company.avg_salary || company.salary || 50000;
        const logoUrl = getLogoUrl(companyName);
        
        console.log(`Company ${index + 1} - Name: ${companyName}, Location: ${companyLocation}, Jobs: ${jobCount}, Salary: ${avgSalary}`);
        
        // Get company icon based on industry
        const getCompanyIcon = (industry) => {
            const industryLower = industry.toLowerCase();
            if (industryLower.includes('tech') || industryLower.includes('software') || industryLower.includes('technology')) return 'fas fa-laptop-code';
            if (industryLower.includes('finance') || industryLower.includes('bank') || industryLower.includes('banking')) return 'fas fa-chart-line';
            if (industryLower.includes('health') || industryLower.includes('medical') || industryLower.includes('pharmaceutical')) return 'fas fa-heartbeat';
            if (industryLower.includes('education')) return 'fas fa-graduation-cap';
            if (industryLower.includes('retail') || industryLower.includes('commerce') || industryLower.includes('e-commerce')) return 'fas fa-shopping-cart';
            if (industryLower.includes('manufacturing') || industryLower.includes('automotive')) return 'fas fa-industry';
            if (industryLower.includes('marketing') || industryLower.includes('advertising')) return 'fas fa-bullhorn';
            if (industryLower.includes('cloud') || industryLower.includes('devops')) return 'fas fa-cloud';
            if (industryLower.includes('analytics') || industryLower.includes('data')) return 'fas fa-chart-bar';
            if (industryLower.includes('design') || industryLower.includes('creative')) return 'fas fa-palette';
            if (industryLower.includes('startup') || industryLower.includes('hub')) return 'fas fa-rocket';
            return 'fas fa-building';
        };
        
        const iconClass = getCompanyIcon(company.industry || companyName);
        console.log(`Company ${index + 1} icon: ${iconClass}`);
        
        companyCard.innerHTML = `
            <div class="company-logo">
                <img src="${logoUrl}" alt="Logo" class="inline-company-logo" />
            </div>
            <div class="company-name">${companyName}</div>
            <div class="company-location">${companyLocation}</div>
            <div class="company-stats">
                <div class="company-stat">
                    <span class="company-stat-number">${jobCount}</span>
                    <span class="company-stat-label">Jobs</span>
                </div>
                <div class="company-stat">
                    <span class="company-stat-number">$${parseInt(avgSalary).toLocaleString()}</span>
                    <span class="company-stat-label">Avg Salary</span>
                </div>
            </div>
        `;
        
        companyCard.onclick = () => {
            console.log(`Company card clicked: ${companyName}`);
            
            // Filter jobs by this company and display them
            const companyJobs = allJobs.filter(job => 
                job.name === companyName || 
                job.company_name === companyName ||
                job.company === companyName
            );
            
            console.log(`Found ${companyJobs.length} jobs for ${companyName}`);
            displayJobs(companyJobs);
            
            // Scroll to jobs section
            document.getElementById('jobs').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update jobs section header
            const jobsHeader = document.querySelector('.featured-jobs .section-header h2');
            if (jobsHeader) {
                jobsHeader.textContent = `Jobs at ${companyName}`;
            }
        };
        
        companiesList.appendChild(companyCard);
        console.log(`Added company card ${index + 1} to DOM`);
    });
    
    console.log('Finished displaying all companies');
}

// Function to show all jobs (for navigation)
function showAllJobs() {
    displayJobs(allJobs);
    const jobsHeader = document.querySelector('.featured-jobs .section-header h2');
    if (jobsHeader) {
        jobsHeader.textContent = 'Featured Opportunities';
    }
}

// Scroll-based navigation highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset for navbar height
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Initialize scroll-based navigation
function initScrollNavigation() {
    // Add scroll event listener
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initial call to set active state
    updateActiveNavLink();
    
    // Add smooth scrolling to navigation links
    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
} 

// Enhanced filter setup functions
function setupFilterEventListeners() {
    // Slider event listeners
    const stipendSlider = document.getElementById('filter-stipend');
    if (stipendSlider) {
        stipendSlider.oninput = function() {
            updateStipendValue(this.value);
            // Real-time filtering
            const filtered = filterJobs(allJobs);
            displayJobs(filtered);
        };
    }
    
    const workHoursSlider = document.getElementById('filter-work-hours');
    if (workHoursSlider) {
        workHoursSlider.oninput = function() {
            updateWorkHoursValue(this.value);
            // Real-time filtering
            const filtered = filterJobs(allJobs);
            displayJobs(filtered);
        };
    }
    
    // Dropdown event listeners for real-time filtering
    const filterDropdowns = [
        'filter-flexibility', 'filter-location', 'filter-role', 'filter-company',
        'filter-experience', 'filter-employment-type', 'filter-sort'
    ];
    
    filterDropdowns.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.onchange = function() {
                const filtered = filterJobs(allJobs);
                displayJobs(filtered);
            };
        }
    });
    
    // Checkbox event listeners
    const filterCheckboxes = [
        'filter-health-insurance', 'filter-remote-work', 
        'filter-flexible-hours', 'filter-professional-development'
    ];
    
    filterCheckboxes.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.onchange = function() {
                const filtered = filterJobs(allJobs);
                displayJobs(filtered);
            };
        }
    });
    
    // Apply filters button
    const applyFiltersBtn = document.getElementById('apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.onclick = function() {
            const filtered = filterJobs(allJobs);
            displayJobs(filtered);
            document.getElementById('filter-modal').style.display = 'none';
        };
    }
    
    // Reset filters button
    const resetFiltersBtn = document.getElementById('reset-filters');
    if (resetFiltersBtn) {
        resetFiltersBtn.onclick = function() {
            resetAllFilters();
            const filtered = filterJobs(allJobs);
            displayJobs(filtered);
        };
    }
    
    // Save filter preset button
    const saveFilterPresetBtn = document.getElementById('save-filter-preset');
    if (saveFilterPresetBtn) {
        saveFilterPresetBtn.onclick = function() {
            saveFilterPreset();
        };
    }
    
    // Clear all filters button
    const clearAllFiltersBtn = document.getElementById('clear-all-filters');
    if (clearAllFiltersBtn) {
        clearAllFiltersBtn.onclick = function() {
            resetAllFilters();
            const filtered = filterJobs(allJobs);
            displayJobs(filtered);
        };
    }
}

function setupPresetFilters() {
    const presetButtons = document.querySelectorAll('.preset-tag');
    presetButtons.forEach(button => {
        button.onclick = function() {
            const preset = this.getAttribute('data-preset');
            
            // Remove active class from all presets
            presetButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked preset
            this.classList.add('active');
            
            // Apply the preset
            applyFilterPreset(preset);
        };
    });
}

function saveFilterPreset() {
    const presetName = prompt('Enter a name for this filter preset:');
    if (!presetName) return;
    
    const currentFilters = {
        flexibility: document.getElementById('filter-flexibility')?.value || '',
        location: document.getElementById('filter-location')?.value || '',
        role: document.getElementById('filter-role')?.value || '',
        company: document.getElementById('filter-company')?.value || '',
        stipend: document.getElementById('filter-stipend')?.value || '0',
        workHours: document.getElementById('filter-work-hours')?.value || '0',
        experience: document.getElementById('filter-experience')?.value || '',
        employmentType: document.getElementById('filter-employment-type')?.value || '',
        benefits: {
            healthInsurance: document.getElementById('filter-health-insurance')?.checked || false,
            remoteWork: document.getElementById('filter-remote-work')?.checked || false,
            flexibleHours: document.getElementById('filter-flexible-hours')?.checked || false,
            professionalDevelopment: document.getElementById('filter-professional-development')?.checked || false
        }
    };
    
    // Save to localStorage
    const savedPresets = JSON.parse(localStorage.getItem('jobFilterPresets') || '{}');
    savedPresets[presetName] = currentFilters;
    localStorage.setItem('jobFilterPresets', JSON.stringify(savedPresets));
    
    alert(`Filter preset "${presetName}" saved successfully!`);
}

// Make functions globally available
window.removeFilter = removeFilter;
window.applyFilterPreset = applyFilterPreset;
window.resetAllFilters = resetAllFilters; 