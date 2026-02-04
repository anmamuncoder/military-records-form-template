const options = {
  blood_groups: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  address_types: ["Permanent", "Present", "Alternate"],
  passport_types: ["Diplomatic", "Service", "Regular", "Official"],
  passport_purposes: ["Official", "Personal", "Both"],
  proficiency_levels: ["Basic", "Intermediate", "Advanced", "Native"],
  acquiring: ["Self Learning", "Diploma", "Course", "Cadre", "Other"],
  relationships: [
    "Wife",
    "Husband",
    "Father",
    "Mother",
    "Sibling",
    "Spouse",
    "Child",
    "Father-in-law",
    "Mother-in-law",
    "Brother-in-law",
    "Sister-in-law",
    "Next of Kin",
  ],
  marital_status: ["Single", "Married", "Divorced", "Widowed"],
  education_types: [
    "SSC",
    "HSC",
    "Honours/Degree/BBA",
    "Masters/Masters Degree/MBA",
    "M Phil",
    "P Hd",
  ],
  divisions: [
    "First Division/Class",
    "Second Division/Class",
    "Third Division/Class",
    "Distinction",
  ],
  commission_types: [
    "Regular Commission",
    "Short Service Commission",
    "Temporary Commission",
  ],
  training_types: ["Home Country", "Abroad"],
  result_b_side: ["A", "B+", "B", "B-", "C", "F"],
  result_y_side: ["X", "Y+", "Y", "Y-"],
  promotion_types: ["Temporary", "Substantive", "Acting"],
  visit_types: [
    "Official PSI",
    "Study Tour",
    "Purchase Committee",
    "UN Mission",
    "LRS, Msn Assessment Team",
    "Misc reasons",
    "Self-Financed",
  ],
  income_sources: [
    "Self",
    "Father",
    "Mother",
    "Father-in-law",
    "Mother-in-law",
    "Spouse",
  ],
  account_types: ["Savings", "Current", "Fixed Deposit", "Salary Account"],
  sex: ["Male", "Female"],
  passport_status: ["New", "Old"],
  nature_of_injury: ["Severe", "Minor"],
  medical_category_class: ["Temp C", "Perm C", "D"],
  ranks: [
    "Lieutenant",
    "Captain",
    "Major",
    "Lieutenant Colonel",
    "Colonel",
    "Brigadier General",
    "Major General",
    "Lieutenant General",
    "General",
  ],
  appointment_types: [
    "Regimental and Command Appointments",
    "On the Staff Appointments",
    "Instructional Appointments",
  ],
  service_type: ["Unit", "ERE"],
  military_legal_type: ["Minor", "Severe", "Exemplary"],
  military_legal_name: [
    "Verbal Wng",
    "Written Wng",
    "Reprimand",
    "Severe Reprimand",
    "RI",
    "Rk Down",
    "Forfeiture of Sr",
    "Dismissed Without Facilities",
    "Dismissed With Civ Jail",
    "Other",
  ],
};

function createSelect(name, opts, required = false) {
  let html = `<select name="${name}" ${required ? "required" : ""}><option value="">Select</option>`;
  opts.forEach((opt) => (html += `<option value="${opt}">${opt}</option>`));
  return html + "</select>";
}

function createInput(
  type,
  name,
  placeholder = "",
  required = false,
  maxLength = null,
) {
  const maxAttr = maxLength ? ` maxlength="${maxLength}"` : "";
  // Add min/max for date type to enforce 4-digit year
  let dateAttr = "";
  if (type === "date") {
    dateAttr = ` min="1900-01-01" max="2099-12-31"`;
  }

  return `<input type="${type}" name="${name}" placeholder="${placeholder}" ${required ? "required" : ""}${maxAttr}${dateAttr}>`;
}

function validateTableRows(type) {
  const tbody = document.getElementById(`${type}_tbody`);
  const rows = Array.from(tbody.querySelectorAll("tr"));

  for (let row of rows) {
    const inputs = row.querySelectorAll("input, select");
    for (let input of inputs) {
      const name = input.name;
      const value = input.value.trim();
      const isRequired = input.hasAttribute("required");

      if (isRequired && !value) {
        const fieldName = input.placeholder || input.name || "field";
        const friendlyName = fieldName
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());
        return {
          valid: false,
          message: `Please complete all required fields before adding another row.\n\nMissing information: ${friendlyName}`,
        };
      }
    }
  }
  return { valid: true };
}

function updateRequiredFields(type) {
  const tbody = document.getElementById(`${type}_tbody`);
  const rows = tbody.querySelectorAll("tr");

  // Keep the required attribute as set in the row creation
  // This function is mainly for maintaining consistency
  rows.forEach((row) => {
    row.querySelectorAll("input, select").forEach((input) => {
      // The required attribute is already set correctly in addRow function
      // No need to change it here
    });
  });
}

function addRow(type) {
  const tbody = document.getElementById(`${type}_tbody`);
  const existingRows = tbody.querySelectorAll("tr");

  if (existingRows.length > 0) {
    const validation = validateTableRows(type);
    if (!validation.valid) {
      alert(validation.message);
      return;
    }
  }

  const row = document.createElement("tr");

  if (type === "addresses") {
    row.innerHTML = `<td>${createSelect("address_type", options.address_types, true)}</td>
<td>${createInput("text", "street_address", "Street Address", true)}</td>
<td>${createInput("text", "city", "City", false, 100)}</td>
<td>${createInput("text", "state", "State", false, 100)}</td>
<td>${createInput("text", "postal_code", "Postal Code", false, 20)}</td>
<td>${createInput("text", "country", "Country", false, 100)}</td>
<td>${createInput("date", "date", "", false)}</td>
<td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
  } else if (type === "language_skills") {
    row.innerHTML = `<td>${createInput("text", "language", "Language", true, 50)}</td>
<td>${createSelect("proficiency", options.proficiency_levels, false)}</td>
<td>${createSelect("reading_skill", options.proficiency_levels, false)}</td>
<td>${createSelect("writing_skill", options.proficiency_levels, false)}</td>
<td>${createSelect("speaking_skill", options.proficiency_levels, false)}</td>
<td>${createSelect("acquiring_skill", options.acquiring, false)}</td>
<td>${createInput("text", "remarks", "Remarks", false)}</td>
<td>${createInput("text", "institution", "Institution", false, 100)}</td>
<td>${createInput("number", "year", "Year", false)}</td>
<td>${createInput("text", "degree", "Degree", false, 100)}</td>
<td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
  } else if (type === "family_members") {
    row.innerHTML = `<td>${createSelect("relationship", options.relationships, true)}</td>
<td>${createInput("text", "name", "Name", true, 200)}</td>
<td>${createInput("text", "nationality", "Nationality", false, 50)}</td>
<td>${createInput("date", "date_of_birth", "", false)}</td>
<td>${createSelect("is_deceased", ["false", "true"], true)}</td>
<td>${createInput("text", "occupation_profession", "Occupation", false, 100)}</td>
<td>${createInput("number", "annual_income", "Annual Income", false)}</td>
<td>${createInput("text", "address", "Address", false)}</td>
<td>${createInput("text", "birth_registration", "Birth Registration", false, 100)}</td>
<td>${createInput("text", "national_id", "National ID", false, 20)}</td>
<td>${createInput("text", "education", "Education", false, 200)}</td>
<td>${createSelect("dependency", ["true", "false"], false)}</td>
<td>${createSelect("sex", options.sex, false)}</td>
<td>${createInput("date", "date_of_expire", "")}</td>
<td>${createInput("text", "location_of_grave", "Location of Grave", false, 100)}</td>
<td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
  } else if (type === "education") {
    row.innerHTML = `<td>${createSelect("institution_type", options.education_types, true, 10)}</td>
<td>${createInput("text", "institution_name", "Institution Name", true, 200)}</td>
<td>${createInput("date", "start_date", "", false)}</td>
<td>${createInput("date", "end_date", "", false)}</td>
<td>${createInput("text", "examination_passed", "Examination Passed", false, 100)}</td>
<td>${createInput("text", "subjects", "Subjects", false)}</td>
<td>${createInput("number", "gpa", "GPA", false)}</td>
<td>${createSelect("division", options.divisions, false)}</td>
<td>${createInput("number", "year_of_passing", "Year", false)}</td>
<td>${createInput("text", "remarks", "Remarks", true)}</td>
<td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
  } else if (type === "passports") {
    row.innerHTML = `<td>${createSelect("status", options.passport_status, false)}</td>
<td>${createInput("text", "passport_number", "Passport Number", true, 50)}</td>
<td>${createInput("date", "issue_date", "", false)}</td>
<td>${createInput("date", "expiry_date", "", false)}</td>
<td>${createInput("text", "authority", "Authority", false, 100)}</td>
<td>${createSelect("passport_type", options.passport_types, false)}</td>
<td>${createSelect("purpose", options.passport_purposes, false)}</td>
<td>${createInput("text", "place_of_issue", "Place of Issue", false, 100)}</td>
<td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
  } else if (type === "medical_histories") {
    row.innerHTML = `<td>${createInput("text", "name_of_disease", "Disease Name", true)}</td>
<td>${createSelect("nature_of_injury", options.nature_of_injury, true)}</td>
<td>${createInput("date", "date_of_medical_admission_from", "", false)}</td>
<td>${createInput("date", "date_of_medical_admission_to", "", false)}</td>
<td>${createSelect("medical_category_class", options.medical_category_class, false)}</td>
<td>${createInput("date", "medical_category_from", "", false)}</td>
<td>${createInput("date", "medical_category_to", "", false)}</td>
<td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
  } else if (type === "pre_commission_services") {
    row.innerHTML = `<td>${createInput("text", "unit", "Unit", true, 100)}</td>
<td>${createInput("text", "designation", "Designation", true, 100)}</td>
<td>${createInput("date", "date_from", "", false)}</td>
<td>${createInput("date", "date_to", "", false)}</td>
<td>${createInput("text", "remarks", "Remarks", true)}</td>
<td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
  } else if (type === "pre_commission_trainings") {
    row.innerHTML = `<td>${createInput("text", "location", "Location", true, 100)}</td>
<td>${createInput("text", "appointment", "Appointment", true, 100)}</td>
<td>${createInput("text", "distinction", "Distinction", true)}</td>
<td>${createInput("text", "remarks", "Remarks", true)}</td>
<td>${createInput("date", "date_from", "", false)}</td>
<td>${createInput("date", "date_to", "", false)}</td>
<td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
  } else if (type === "post_commission_trainings") {
    row.innerHTML = `<td>${createSelect("training_type", options.training_types, true)}</td>
<td>${createInput("text", "course_name", "Course Name", false, 200)}</td>
<td>${createInput("text", "location", "Location", true, 100)}</td>
<td>${createInput("date", "date_from", "", false)}</td>
<td>${createInput("date", "date_to", "", false)}</td>

<td>${createSelect("result_b_side", options.result_b_side)}</td>

<td>${createSelect("result_y_side", options.result_y_side)}</td>
<td>${createInput("number", "mark_obtained_b_side", "Mark B Side")}</td>
<td>${createInput("number", "mark_obtained_y_side", "Mark Y Side")}</td>
<td>${createInput("text", "remarks", "Remarks")}</td>
<td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
  } else if (type === "additional_qualifications") {
    row.innerHTML = `<td>${createInput("text", "qualification", "Qualification", true, 200)}</td>
<td>${createInput("date", "date_obtained", "", true)}</td>
<td>${createInput("text", "authority", "Authority", true, 100)}</td>
<td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
  } else if (type === "map_reading_promotion_exams") {
    row.innerHTML = `<td>${createInput("text", "exam_name", "Exam Name", true, 100)}</td>
<td>${createInput("number", "passing_year", "Passing Year", true)}</td>
<td>${createInput("text", "authority", "Authority", false, 100)}</td>
<td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
  } else if (type === "promotions") {
    row.innerHTML = `<td>${createInput("date", "promotion_date", "", true)}</td>
<td>${createSelect("promotion_type", options.promotion_types, true)}</td>
<td>${createSelect("rank", options.ranks, true)}</td>
<td>${createInput("text", "authority", "Authority", false, 100)}</td>
<td>${createInput("text", "order", "Order", false, 50)}</td>
<td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
  } else if (type === "service_records") {
    row.innerHTML = `<td>${createInput("date", "date_from", "", true)}</td>
<td>${createInput("date", "date_to", "")}</td>
<td>${createSelect("appointment_type", options.appointment_types)}</td>
<td>${createInput("text", "appointment_name", "Appointment Name")}</td>
<td>${createSelect("service_type", options.service_type, true)}</td>
<td>${createInput("text", "unit_ere_name", "Unit/ERE Name", true, 100)}</td>
<td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
  } else if (type === "operational_awards") {
    row.innerHTML = `<td>${createInput("text", "operation_name", "Operation Name", true, 200)}</td>
<td>${createInput("date", "date_from", "", false)}</td>
<td>${createInput("date", "date_to", "", false)}</td>
<td>${createInput("text", "appointment", "Appointment", true, 100)}</td>
<td>${createInput("text", "award_receive", "Award Receive", true)}</td>
<td>${createInput("text", "authority", "Authority", false, 100)}</td>
<td>${createInput("text", "remarks", "Remarks", true)}</td>
<td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
  } else if (type === "non_operational_awards") {
    row.innerHTML = `<td>${createInput("text", "description", "Description", true)}</td>
<td>${createInput("date", "date_awarded", "", true)}</td>
<td>${createInput("text", "details", "Details", true)}</td>
<td>${createInput("text", "authority", "Authority", true, 100)}</td>
<td>${createInput("text", "remarks", "Remarks", true)}</td>
<td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
  } else if (type === "overseas_visits") {
    row.innerHTML = `
<td>${createSelect("visit_type", options.visit_types, true)}</td>
<td>${createInput("text", "country", "Country", true, 100)}</td>
<td>${createInput("date", "start_date", "", true)}</td>
<td>${createInput("date", "end_date", "", true)}</td>
<td>${createInput("text", "reason", "Reason", true)}</td>
<td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
  } else if (type === "annual_incomes") {
    row.innerHTML = `<td>${createInput("text", "person", "Person", true)}</td>
<td>${createSelect("income_source", options.income_sources, true)}</td>
<td>${createInput("number", "amount", "Amount", true)}</td>
<td>${createInput("number", "year", "Year", true)}</td>
<td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
  } else if (type === "bank_accounts") {
    row.innerHTML = `<td>${createInput("text", "bank_name", "Bank Name", true, 100)}</td>
<td>${createInput("text", "account_number", "Account Number", true)}</td>
<td>${createSelect("account_type", options.account_types, true)}</td>
<td>${createInput("text", "branch", "Branch", true, 100)}</td>
<td>${createInput("date", "opening_date", "", false)}</td>
<td>${createInput("date", "closing_date", "")}</td>
<td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
  } else if (type === "military_legal_records") {
    row.innerHTML = `<td>${createSelect("military_legal_type", options.military_legal_type, true)}</td>
<td>${createSelect("military_legal_name", options.military_legal_name, true)}</td>
<td>${createInput("text", "remarks", "Remarks")}</td>
<td>${createInput("date", "date", "", true)}</td>
<td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
  } else if (type === "civil_legal_records") {
    row.innerHTML = `<td>${createInput("text", "law_section", "Law Section", true, 100)}</td>
<td>${createInput("text", "crime_details", "Crime Details", true)}</td>
<td>${createInput("date", "date_judgment", "", true)}</td>
<td>${createInput("text", "place", "Place", true, 100)}</td>
<td>${createInput("text", "punishment", "Punishment", true)}</td>
<td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
  } else if (type === "ranks_held") {
    row.innerHTML = `<td>${createInput("date", "date", "", true)}</td>
<td>${createSelect("promotion_type", options.promotion_types, true)}</td>
<td>${createSelect("rank", options.ranks, true)}</td>
<td>${createInput("text", "retrospective", "Retrospective")}</td>
<td>${createInput("text", "notified", "Notified", false)}</td>
<td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
  }

  tbody.appendChild(row);
  updateRequiredFields(type);
  // Update required headers after adding row
  setTimeout(markRequiredHeaders, 50);
  // Update button visibility
  updateTableButtons(type);
}

function deleteRow(btn) {
  const tbody = btn.closest("tbody");
  const type = tbody.id.replace("_tbody", "");
  btn.closest("tr").remove();
  updateRequiredFields(type);
  // Update button visibility
  updateTableButtons(type);
}

// Table display names mapping
const tableDisplayNames = {
  addresses: "Address",
  language_skills: "Language Skill",
  family_members: "Family Member",
  education: "Education",
  passports: "Passport",
  medical_histories: "Medical History",
  pre_commission_services: "Pre Commission Service",
  pre_commission_trainings: "Pre Commission Training",
  post_commission_trainings: "Post Commission Training",
  additional_qualifications: "Additional Qualification",
  map_reading_promotion_exams: "Map Reading Promotion Exam",
  promotions: "Promotion",
  service_records: "Service Record",
  operational_awards: "Operational Award",
  non_operational_awards: "Non Operational Award",
  overseas_visits: "Overseas Visit",
  annual_incomes: "Annual Income",
  bank_accounts: "Bank Account",
  military_legal_records: "Military Legal Record",
  civil_legal_records: "Civil Legal Record",
  ranks_held: "Rank Held",
};

function updateTableButtons(type, isInitialLoad = false) {
  const tbody = document.getElementById(`${type}_tbody`);
  if (!tbody) return;

  const rows = tbody.querySelectorAll("tr");
  const hasRows = rows.length > 0;

  // Find the section containing this table
  const section = tbody.closest(".section");
  if (!section) return;

  // Find the table and thead
  const table = tbody.closest("table");
  const thead = table ? table.querySelector("thead") : null;

  // Hide/show thead based on row count
  if (thead) {
    if (hasRows) {
      thead.style.display = "";
    } else {
      thead.style.display = "none";
    }
  }

  // Find or create the add-first-row button container
  let addFirstBtnContainer = section.querySelector(".add-first-row-container");
  let addFirstBtn = addFirstBtnContainer
    ? addFirstBtnContainer.querySelector(".btn-add-first-row")
    : null;
  const addRowBtn = section.querySelector(".btn-add-row");

  if (hasRows) {
    // Hide add-first-row button container, show add-row button
    if (addFirstBtnContainer) addFirstBtnContainer.style.display = "none";
    if (addRowBtn) addRowBtn.style.display = "flex";
  } else {
    // Show add-first-row button when there are no rows (including on initial load)
    const tableContainer = section.querySelector(".table-container");
    if (!addFirstBtnContainer && tableContainer) {
      // Create container and button if they don't exist
      addFirstBtnContainer = document.createElement("div");
      addFirstBtnContainer.className = "add-first-row-container";
      addFirstBtnContainer.style.textAlign = "center";
      addFirstBtnContainer.style.padding = "40px 20px";
      addFirstBtnContainer.style.background = "#f8f9fc";
      addFirstBtnContainer.style.borderRadius = "8px";
      addFirstBtnContainer.style.border = "2px dashed #cbd5e0";

      addFirstBtn = document.createElement("button");
      addFirstBtn.type = "button";
      addFirstBtn.className = "btn-add-first-row";
      addFirstBtn.onclick = () => addRow(type);
      addFirstBtn.textContent = `Add ${tableDisplayNames[type] || type}`;

      addFirstBtnContainer.appendChild(addFirstBtn);
      tableContainer.insertBefore(
        addFirstBtnContainer,
        tableContainer.firstChild,
      );
    }
    // Ensure the button container is visible
    if (addFirstBtnContainer) {
      addFirstBtnContainer.style.display = "block";
    }
    if (addRowBtn) addRowBtn.style.display = "none";
  }
}

function initializeTableButtons() {
  Object.keys(tableDisplayNames).forEach((type) => {
    updateTableButtons(type, true); // Pass true to indicate initial load
  });
}

function getValue(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

function getSelectValue(id) {
  const val = getValue(id);
  return val || null;
}

function getDateValue(id) {
  const val = getValue(id);
  // HTML date inputs return YYYY-MM-DD format (ISO 8601)
  // Return null if empty, otherwise return the date string in Y-M-D format
  return val || null;
}

function getDecimalValue(id) {
  const val = getValue(id);
  if (!val) return null;
  const num = parseFloat(val);
  if (isNaN(num)) return null;
  // Ensure it's always a decimal (e.g., 3 becomes 3.0)
  // Return as float to ensure it's always treated as decimal
  return parseFloat(num.toFixed(1));
}

function getIntegerValue(id) {
  const val = getValue(id);
  if (!val) return null;
  const num = parseInt(val, 10);
  if (isNaN(num)) return null;
  // Return as integer
  return num;
}

function formatDecimalValue(val) {
  if (val === null || val === undefined || val === "") return null;
  const num = parseFloat(val);
  if (isNaN(num)) return null;
  // Ensure it's always a decimal (e.g., 3 becomes 3.0)
  // Return as float to ensure it's always treated as decimal
  return parseFloat(num.toFixed(1));
}

function formatIntegerValue(val) {
  if (val === null || val === undefined || val === "") return null;
  const num = parseInt(val, 10);
  if (isNaN(num)) return null;
  // Return as integer
  return num;
}

function getTableData(type) {
  const tbody = document.getElementById(`${type}_tbody`);
  const rows = Array.from(tbody.querySelectorAll("tr"));

  return rows.map((row) => {
    const data = {};
    const inputs = row.querySelectorAll("input, select");
    inputs.forEach((input) => {
      let val = input.value.trim();
      const name = input.name;

      if (input.tagName === "SELECT") {
        if (!val) val = null;
      } else if (input.type === "number") {
        // Decimal fields: annual_income, amount, gpa
        if (name === "annual_income" || name === "amount" || name === "gpa") {
          val = formatDecimalValue(val);
        } else if (
          // Integer fields: year, passing_year, year_of_passing, mark_obtained_b_side, mark_obtained_y_side
          name === "year" ||
          name === "passing_year" ||
          name === "year_of_passing" ||
          name === "mark_obtained_b_side" ||
          name === "mark_obtained_y_side"
        ) {
          val = formatIntegerValue(val);
        } else {
          val = val ? parseFloat(val) : null;
        }
      } else if (input.type === "date") {
        // HTML date inputs return YYYY-MM-DD format (ISO 8601) - Y-M-D format
        val = val || null;
      } else if (!val) {
        val = null;
      }

      if (name === "is_deceased" || name === "dependency") {
        data[name] = val === "true" || val === true;
      } else {
        data[name] = val;
      }
    });
    return data;
  });
}

function validateTableRequiredFields(type, requiredFields, sectionName) {
  const errors = [];
  const tbody = document.getElementById(`${type}_tbody`);
  if (!tbody) return errors;

  const rows = Array.from(tbody.querySelectorAll("tr"));
  // Skip validation if no rows exist - will return empty array in JSON
  if (rows.length === 0) {
    return errors;
  }

  rows.forEach((row, index) => {
    const inputs = row.querySelectorAll("input, select");
    requiredFields.forEach((fieldName) => {
      const input = Array.from(inputs).find((inp) => inp.name === fieldName);
      if (!input) return;

      let value = input.value.trim();

      // Handle boolean fields (is_deceased) - they should have "true" or "false" value
      if (fieldName === "is_deceased") {
        if (!value || value === "" || value === "Select") {
          const rowNum = index + 1;
          const friendlyFieldName = "Is Deceased";
          errors.push(`${sectionName} - Entry ${rowNum}: ${friendlyFieldName}`);
        }
      } else if (!value || value === "" || value === "Select") {
        const rowNum = index + 1;
        // Convert field name to human-readable format
        const friendlyFieldName = fieldName
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase())
          .replace(/Id/g, "ID")
          .replace(/Gpa/g, "GPA")
          .replace(/No/g, "No.");
        errors.push(`${sectionName} - Entry ${rowNum}: ${friendlyFieldName}`);
      }
    });
  });

  return errors;
}

function validateRequiredSections() {
  const errors = [];

  // Validate Person section
  if (!getValue("person_name")) errors.push("Person - Name");
  if (!getValue("short_name")) errors.push("Person - Short Name");
  if (!getValue("person_personal_no")) errors.push("Person - Personal No");

  // Validate Personal Info section
  if (!getValue("national_id_number"))
    errors.push("Personal Info - National ID Number");

  // Validate Address
  errors.push(
    ...validateTableRequiredFields(
      "addresses",
      ["address_type", "street_address"],
      "Address",
    ),
  );

  // Validate Language Skills
  errors.push(
    ...validateTableRequiredFields(
      "language_skills",
      ["language"],
      "Language Skill",
    ),
  );

  // Validate Family Members
  errors.push(
    ...validateTableRequiredFields(
      "family_members",
      ["relationship", "name", "is_deceased"],
      "Family Member",
    ),
  );

  // Validate Education
  errors.push(
    ...validateTableRequiredFields(
      "education",
      ["institution_type", "institution_name", "remarks"],
      "Education",
    ),
  );

  // Validate Passports
  errors.push(
    ...validateTableRequiredFields(
      "passports",
      ["passport_number"],
      "Passport",
    ),
  );

  // Validate Medical Histories
  errors.push(
    ...validateTableRequiredFields(
      "medical_histories",
      ["name_of_disease", "nature_of_injury"],
      "Medical History",
    ),
  );

  // Validate Pre Commission Services
  errors.push(
    ...validateTableRequiredFields(
      "pre_commission_services",
      ["unit", "designation", "remarks"],
      "Pre Commission Service",
    ),
  );

  // Validate Pre Commission Trainings
  errors.push(
    ...validateTableRequiredFields(
      "pre_commission_trainings",
      ["location", "appointment", "distinction", "remarks"],
      "Pre Commission Training",
    ),
  );

  // Validate Commission section
  if (!getValue("academy_course")) errors.push("Commission - Academy Course");
  if (!getValue("commission_type")) errors.push("Commission - Commission Type");
  if (!getValue("commission_authority"))
    errors.push("Commission - Commission Authority");
  if (!getValue("order_number")) errors.push("Commission - Order Number");
  if (!getValue("ante_date_seniority"))
    errors.push("Commission - Ante Date Seniority");
  if (!getValue("permanent_commission_authority"))
    errors.push("Commission - Permanent Commission Authority");
  if (!getValue("joining_bangladesh_army_authority"))
    errors.push("Commission - Joining Bangladesh Army Authority");

  // Validate Post Commission Trainings
  errors.push(
    ...validateTableRequiredFields(
      "post_commission_trainings",
      ["training_type", "location"],
      "Post Commission Training",
    ),
  );

  // Validate Additional Qualifications
  errors.push(
    ...validateTableRequiredFields(
      "additional_qualifications",
      ["qualification", "date_obtained", "authority"],
      "Additional Qualification",
    ),
  );

  // Validate Map Reading Promotion Exams
  errors.push(
    ...validateTableRequiredFields(
      "map_reading_promotion_exams",
      ["exam_name", "passing_year"],
      "Map Reading Promotion Exam",
    ),
  );

  // Validate Promotions
  errors.push(
    ...validateTableRequiredFields(
      "promotions",
      ["promotion_date", "promotion_type", "rank"],
      "Promotion",
    ),
  );

  // Validate Service Records
  errors.push(
    ...validateTableRequiredFields(
      "service_records",
      ["date_from", "service_type", "unit_ere_name"],
      "Service Record",
    ),
  );

  // Validate Operational Awards
  errors.push(
    ...validateTableRequiredFields(
      "operational_awards",
      ["operation_name", "appointment", "award_receive", "remarks"],
      "Operational Award",
    ),
  );

  // Validate Non Operational Awards
  errors.push(
    ...validateTableRequiredFields(
      "non_operational_awards",
      ["description", "date_awarded", "details", "authority", "remarks"],
      "Non Operational Award",
    ),
  );

  // Validate Overseas Visits
  errors.push(
    ...validateTableRequiredFields(
      "overseas_visits",
      ["visit_type", "country", "start_date", "end_date", "reason"],
      "Overseas Visit",
    ),
  );

  // Validate Annual Incomes
  errors.push(
    ...validateTableRequiredFields(
      "annual_incomes",
      ["person", "income_source", "amount", "year"],
      "Annual Income",
    ),
  );

  // Validate Bank Accounts
  errors.push(
    ...validateTableRequiredFields(
      "bank_accounts",
      ["bank_name", "account_number", "account_type", "branch"],
      "Bank Account",
    ),
  );

  // Validate Military Legal Records
  errors.push(
    ...validateTableRequiredFields(
      "military_legal_records",
      ["date", "military_legal_type", "military_legal_name"],
      "Military Legal Record",
    ),
  );

  // Validate Civil Legal Records
  errors.push(
    ...validateTableRequiredFields(
      "civil_legal_records",
      ["law_section", "crime_details", "place", "punishment"],
      "Civil Legal Record",
    ),
  );

  // Validate Ranks Held
  errors.push(
    ...validateTableRequiredFields(
      "ranks_held",
      ["date", "promotion_type", "rank"],
      "Ranks Held",
    ),
  );

  if (errors.length > 0) {
    const errorMessage =
      "Please complete all required fields before downloading your data.\n\n" +
      "The following information is missing:\n\n" +
      errors.join("\n");
    alert(errorMessage);
    return false;
  }
  return true;
}

function clearForm() {
  if (!confirm("Clear all data?")) return;

  // Clear all form inputs (non-table inputs)
  document.querySelectorAll("input, select").forEach((el) => {
    if (!el.closest("tbody")) {
      el.value = "";
    }
  });

  // Clear all table rows
  const tableTypes = Object.keys(tableDisplayNames);
  tableTypes.forEach((type) => {
    const tbody = document.getElementById(`${type}_tbody`);
    if (tbody) {
      const rows = tbody.querySelectorAll("tr");
      rows.forEach((row) => row.remove());
      // Update button visibility after clearing
      updateTableButtons(type);
    }
  });

  alert("All form data has been cleared successfully.");
}

function saveJSON() {
  if (!validateRequiredSections()) {
    return;
  }

  const data = {
    person: {
      name: getValue("person_name"),
      personal_no: getValue("person_personal_no"),
      short_name: getValue("short_name"),
      mobile_no: getValue("person_mobile_no"),
      inactive_date: getDateValue("inactive_date"),
      // picture: getValue("person_picture") || null,
    },
    personal_info: {
      national_id_number: getValue("national_id_number"),
      arms_service: getValue("arms_service") || null,
      date_of_birth: getDateValue("date_of_birth"),
      place_of_birth: getValue("place_of_birth"),
      birth_certificate_number: getValue("birth_certificate_number"),
      height_cm: getDecimalValue("height_cm"),
      height_inch: getDecimalValue("height_inch"),
      weight_kg: getDecimalValue("weight_kg"),
      weight_pound: getDecimalValue("weight_pound"),
      build: getValue("build"),
      complexion: getValue("complexion"),
      eye_color: getValue("eye_color"),
      visible_identification_marks:
        getValue("visible_identification_marks") || null,
      blood_group: getSelectValue("blood_group"),
      religion: getValue("religion"),
      caste: getValue("caste") || null,
      nationality: getValue("nationality"),
      previous_nationality: getValue("previous_nationality") || null,
      present_medical_category: getValue("present_medical_category"),
      present_nature_of_disability: getValue("present_nature_of_disability"),
      present_attributes: getValue("present_attributes"),
      email: getValue("email"),
      personal_phone_no: getValue("personal_phone_no"),
      tnt_phone_no: getValue("tnt_phone_no") || null,
      position_among_siblings: getIntegerValue("position_among_siblings"),
      marital_status: getSelectValue("marital_status"),
      date_of_marriage: getDateValue("date_of_marriage"),
    },
    addresses: getTableData("addresses"),
    language_skills: getTableData("language_skills"),
    family_members: getTableData("family_members"),
    education: getTableData("education"),
    passports: getTableData("passports"),
    medical_histories: getTableData("medical_histories"),
    pre_commission_services: getTableData("pre_commission_services"),
    pre_commission_trainings: getTableData("pre_commission_trainings"),
    commission: {
      academy_course: getValue("academy_course"),
      date_of_joining_academy: getDateValue("date_of_joining_academy"),
      date_of_commission: getDateValue("date_of_commission"),
      commission_type: getSelectValue("commission_type"),
      commission_authority: getValue("commission_authority"),
      order_number: getValue("order_number"),
      ante_date_seniority: getDateValue("ante_date_seniority"),
      ante_date_authority: getValue("ante_date_authority") || null,
      permanent_commission_date: getDateValue("permanent_commission_date"),
      permanent_commission_authority: getValue(
        "permanent_commission_authority",
      ),
      date_of_joining_bangladesh_army: getDateValue(
        "date_of_joining_bangladesh_army",
      ),
      joining_bangladesh_army_authority: getValue(
        "joining_bangladesh_army_authority",
      ),
      original_arms_service: getValue("original_arms_service") || null,
      previous_arms_service: getValue("previous_arms_service") || null,
    },
    post_commission_trainings: getTableData("post_commission_trainings"),
    additional_qualifications: getTableData("additional_qualifications"),
    map_reading_promotion_exams: getTableData("map_reading_promotion_exams"),
    promotions: getTableData("promotions"),
    service_records: getTableData("service_records"),
    operational_awards: getTableData("operational_awards"),
    non_operational_awards: getTableData("non_operational_awards"),
    overseas_visits: getTableData("overseas_visits"),
    annual_incomes: getTableData("annual_incomes"),
    bank_accounts: getTableData("bank_accounts"),
    military_legal_records: getTableData("military_legal_records"),
    civil_legal_records: getTableData("civil_legal_records"),
    ranks_held: getTableData("ranks_held"),
  };

  // Store data in localStorage for the modal
  localStorage.setItem("personnelData", JSON.stringify(data));

  // Show the modal instead of downloading directly
  showModal();
}

function markRequiredHeaders() {
  const tableTypes = [
    "addresses",
    "language_skills",
    "family_members",
    "education",
    "passports",
    "medical_histories",
    "pre_commission_services",
    "pre_commission_trainings",
    "post_commission_trainings",
    "additional_qualifications",
    "map_reading_promotion_exams",
    "promotions",
    "service_records",
    "operational_awards",
    "non_operational_awards",
    "overseas_visits",
    "annual_incomes",
    "bank_accounts",
    "military_legal_records",
    "civil_legal_records",
    "ranks_held",
  ];

  tableTypes.forEach((type) => {
    const tbody = document.getElementById(`${type}_tbody`);
    const thead = tbody.closest("table")?.querySelector("thead");
    if (!thead) return;

    const headerRow = thead.querySelector("tr");
    if (!headerRow) return;

    const headers = Array.from(headerRow.querySelectorAll("th"));
    const firstDataRow = tbody.querySelector("tr");

    if (firstDataRow) {
      const inputs = firstDataRow.querySelectorAll("input, select");
      inputs.forEach((input, index) => {
        // Skip the Action column (last column)
        if (index < headers.length - 1) {
          const header = headers[index];
          if (input.hasAttribute("required")) {
            header.classList.add("required-header");
          } else {
            header.classList.remove("required-header");
          }
        }
      });
    }
  });
}

// Modal functions
let personnelData = {};

function showModal() {
  personnelData = JSON.parse(localStorage.getItem("personnelData")) || {};
  renderContent();
  document.getElementById("reviewModal").style.display = "flex";
}

function closeModal() {
  if (confirm("Are you sure you want to close this review?")) {
    document.getElementById("reviewModal").style.display = "none";
  }
}

function downloadJSON() {
  // First stringify the data
  let jsonString = JSON.stringify(personnelData, null, 2);

  // List of decimal field names that should always show as decimal (e.g., 3.0)
  const decimalFields = [
    "height_cm",
    "height_inch",
    "weight_kg",
    "weight_pound",
    "annual_income",
    "gpa",
    "amount",
  ];

  // Replace whole numbers in decimal fields with decimal format (3 -> 3.0)
  decimalFields.forEach((field) => {
    // Match the field name followed by colon and a whole number
    // Pattern: "field_name": 3  ->  "field_name": 3.0
    const regex = new RegExp(`("${field}"\\s*:\\s*)(\\d+)([,\\n])`, "g");
    jsonString = jsonString.replace(regex, (match, prefix, number, suffix) => {
      return `${prefix}${parseFloat(number).toFixed(1)}${suffix}`;
    });
  });

  const blob = new Blob([jsonString], {
    type: "application/json",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download =
    `${personnelData.person?.personal_no}-RECORD.json` || "unknown_record.json";
  link.click();
}

// Helper function to format values
function formatValue(value) {
  if (value === null || value === undefined || value === "" || value === "-") {
    return '<span class="no-data">N/A</span>';
  }
  return value;
}

// Helper function to format dates
function formatDate(dateString) {
  if (!dateString) return '<span class="no-data">N/A</span>';
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
}

// Generate Personal Information Section
function generatePersonalreview() {
  const person = personnelData.person;
  const review = personnelData.personal_info;

  return `
                <div class="section">
                    <div class="section-title">BASIC INFORMATION</div>
                    <div class="review-grid">
                        <div class="review-item">
                            <div class="review-label">Name</div>
                            <div class="review-value">${formatValue(person.name)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Personal Number</div>
                            <div class="review-value">${formatValue(person.personal_no)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Short Name</div>
                            <div class="review-value">${formatValue(person.short_name)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Mobile Number</div>
                            <div class="review-value">${formatValue(person.mobile_no)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">National ID</div>
                            <div class="review-value">${formatValue(review.national_id_number)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Arms/Service</div>
                            <div class="review-value">${formatValue(review.arms_service)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Date of Birth</div>
                            <div class="review-value">${formatDate(review.date_of_birth)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Place of Birth</div>
                            <div class="review-value">${formatValue(review.place_of_birth)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Birth Certificate</div>
                            <div class="review-value">${formatValue(review.birth_certificate_number)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Blood Group</div>
                            <div class="review-value">${formatValue(review.blood_group)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Religion</div>
                            <div class="review-value">${formatValue(review.religion)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Nationality</div>
                            <div class="review-value">${formatValue(review.nationality)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Marital Status</div>
                            <div class="review-value">${formatValue(review.marital_status)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Date of Marriage</div>
                            <div class="review-value">${formatDate(review.date_of_marriage)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Email</div>
                            <div class="review-value">${formatValue(review.email)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Medical Category</div>
                            <div class="review-value">${formatValue(review.present_medical_category)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Caste</div>
                            <div class="review-value">${formatValue(review.caste)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Previous Nationality</div>
                            <div class="review-value">${formatValue(review.previous_nationality)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Nature of Disability</div>
                            <div class="review-value">${formatValue(review.present_nature_of_disability)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Disability Attributes</div>
                            <div class="review-value">${formatValue(review.present_attributes)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Personal Phone</div>
                            <div class="review-value">${formatValue(review.personal_phone_no)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">T&T Phone</div>
                            <div class="review-value">${formatValue(review.tnt_phone_no)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Position Among Siblings</div>
                            <div class="review-value">${formatValue(review.position_among_siblings)}</div>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">PHYSICAL ATTRIBUTES</div>
                    <div class="review-grid">
                        <div class="review-item">
                            <div class="review-label">Height (cm)</div>
                            <div class="review-value">${formatValue(review.height_cm)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Height (inch)</div>
                            <div class="review-value">${formatValue(review.height_inch)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Weight (kg)</div>
                            <div class="review-value">${formatValue(review.weight_kg)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Weight (pound)</div>
                            <div class="review-value">${formatValue(review.weight_pound)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Build</div>
                            <div class="review-value">${formatValue(review.build)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Complexion</div>
                            <div class="review-value">${formatValue(review.complexion)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Eye Color</div>
                            <div class="review-value">${formatValue(review.eye_color)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Identification Marks</div>
                            <div class="review-value">${formatValue(review.visible_identification_marks)}</div>
                        </div>
                    </div>
                </div>
            `;
}

// Generate Addresses Section
function generateAddresses() {
  if (!personnelData.addresses || personnelData.addresses.length === 0) {
    return '<div class="section"><div class="section-title">ADDRESSES</div><p class="no-data">No address information available</p></div>';
  }

  let html = `
                <div class="section">
                    <div class="section-title">ADDRESSES</div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Street Address</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Postal Code</th>
                                    <th>Country</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

  personnelData.addresses.forEach((addr) => {
    html += `
                    <tr>
                        <td>${formatValue(addr.address_type)}</td>
                        <td>${formatValue(addr.street_address)}</td>
                        <td>${formatValue(addr.city)}</td>
                        <td>${formatValue(addr.state)}</td>
                        <td>${formatValue(addr.postal_code)}</td>
                        <td>${formatValue(addr.country)}</td>
                        <td>${formatDate(addr.date)}</td>
                    </tr>
                `;
  });

  html += `
                        </tbody>
                    </table>
                    </div>
                </div>
            `;

  return html;
}

// Generate Language Skills Section
function generateLanguageSkills() {
  if (
    !personnelData.language_skills ||
    personnelData.language_skills.length === 0
  ) {
    return '<div class="section"><div class="section-title">LANGUAGE SKILLS</div><p class="no-data">No language skills information available</p></div>';
  }

  let html = `
                <div class="section">
                    <div class="section-title">LANGUAGE SKILLS</div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Language</th>
                                    <th>Proficiency</th>
                                    <th>Reading</th>
                                    <th>Writing</th>
                                    <th>Speaking</th>
                                    <th>Acquiring Skill</th>
                                    <th>Remarks</th>
                                    <th>Institution</th>
                                    <th>Year</th>
                                    <th>Degree</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

  personnelData.language_skills.forEach((lang) => {
    html += `
                    <tr>
                        <td>${formatValue(lang.language)}</td>
                        <td>${formatValue(lang.proficiency)}</td>
                        <td>${formatValue(lang.reading_skill)}</td>
                        <td>${formatValue(lang.writing_skill)}</td>
                        <td>${formatValue(lang.speaking_skill)}</td>
                        <td>${formatValue(lang.acquiring_skill)}</td>
                        <td>${formatValue(lang.remarks)}</td>
                        <td>${formatValue(lang.institution)}</td>
                        <td>${formatValue(lang.year)}</td>
                        <td>${formatValue(lang.degree)}</td>
                    </tr>
                `;
  });

  html += `
                        </tbody>
                    </table>
                    </div>
                </div>
            `;

  return html;
}

// Generate Family Members Section
function generateFamilyMembers() {
  if (
    !personnelData.family_members ||
    personnelData.family_members.length === 0
  ) {
    return '<div class="section"><div class="section-title">FAMILY MEMBERS</div><p class="no-data">No family members information available</p></div>';
  }

  let html = `
                <div class="section">
                    <div class="section-title">FAMILY MEMBERS</div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Relationship</th>
                                    <th>Name</th>
                                    <th>Nationality</th>
                                    <th>Date of Birth</th>
                                    <th>Sex</th>
                                    <th>Occupation</th>
                                    <th>Education</th>
                                    <th>Annual Income</th>
                                    <th>Address</th>
                                    <th>Birth Registration</th>
                                    <th>National ID</th>
                                    <th>Dependency</th>
                                    <th>Status</th>
                                    <th>Date of Expire</th>
                                    <th>Location of Grave</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

  personnelData.family_members.forEach((member) => {
    html += `
                    <tr>
                        <td>${formatValue(member.relationship)}</td>
                        <td>${formatValue(member.name)}</td>
                        <td>${formatValue(member.nationality)}</td>
                        <td>${formatDate(member.date_of_birth)}</td>
                        <td>${formatValue(member.sex)}</td>
                        <td>${formatValue(member.occupation_profession)}</td>
                        <td>${formatValue(member.education)}</td>
                        <td>${formatValue(member.annual_income)}</td>
                        <td>${formatValue(member.address)}</td>
                        <td>${formatValue(member.birth_registration)}</td>
                        <td>${formatValue(member.national_id)}</td>
                        <td>${member.dependency ? "Yes" : "No"}</td>
                        <td>${member.is_deceased ? "Deceased" : "Living"}</td>
                        <td>${formatDate(member.date_of_expire)}</td>
                        <td>${formatValue(member.location_of_grave)}</td>
                    </tr>
                `;
  });

  html += `
                        </tbody>
                    </table>
                    </div>
                </div>
            `;

  return html;
}

// Generate Education Section
function generateEducation() {
  if (!personnelData.education || personnelData.education.length === 0) {
    return '<div class="section"><div class="section-title">EDUCATION</div><p class="no-data">No education information available</p></div>';
  }

  let html = `
                <div class="section">
                    <div class="section-title">EDUCATION</div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Institution</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Examination</th>
                                    <th>Subjects</th>
                                    <th>GPA</th>
                                    <th>Division</th>
                                    <th>Year</th>
                                    <th>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

  personnelData.education.forEach((edu) => {
    html += `
                    <tr>
                        <td>${formatValue(edu.institution_type)}</td>
                        <td>${formatValue(edu.institution_name)}</td>
                        <td>${formatDate(edu.start_date)}</td>
                        <td>${formatDate(edu.end_date)}</td>
                        <td>${formatValue(edu.examination_passed)}</td>
                        <td>${formatValue(edu.subjects)}</td>
                        <td>${formatValue(edu.gpa)}</td>
                        <td>${formatValue(edu.division)}</td>
                        <td>${formatValue(edu.year_of_passing)}</td>
                        <td>${formatValue(edu.remarks)}</td>
                    </tr>
                `;
  });

  html += `
                        </tbody>
                    </table>
                    </div>
                </div>
            `;

  return html;
}

// Generate Commission Information
function generateCommission() {
  if (!personnelData.commission)
    return '<div class="section"><div class="section-title">COMMISSION INFORMATION</div><p class="no-data">No commission information available</p></div>';

  const comm = personnelData.commission;

  return `
                <div class="section">
                    <div class="section-title">COMMISSION INFORMATION</div>
                    <div class="review-grid">
                        <div class="review-item">
                            <div class="review-label">Academy Course</div>
                            <div class="review-value">${formatValue(comm.academy_course)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Date of Joining Academy</div>
                            <div class="review-value">${formatDate(comm.date_of_joining_academy)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Date of Commission</div>
                            <div class="review-value">${formatDate(comm.date_of_commission)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Commission Type</div>
                            <div class="review-value">${formatValue(comm.commission_type)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Commission Authority</div>
                            <div class="review-value">${formatValue(comm.commission_authority)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Order Number</div>
                            <div class="review-value">${formatValue(comm.order_number)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Ante Date Seniority</div>
                            <div class="review-value">${formatDate(comm.ante_date_seniority)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Date of Joining Bangladesh Army</div>
                            <div class="review-value">${formatDate(comm.date_of_joining_bangladesh_army)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Joining Authority</div>
                            <div class="review-value">${formatValue(comm.joining_bangladesh_army_authority)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Ante Date Authority</div>
                            <div class="review-value">${formatValue(comm.ante_date_authority)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Permanent Commission Date</div>
                            <div class="review-value">${formatDate(comm.permanent_commission_date)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Permanent Commission Authority</div>
                            <div class="review-value">${formatValue(comm.permanent_commission_authority)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Original Arms/Service</div>
                            <div class="review-value">${formatValue(comm.original_arms_service)}</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Previous Arms/Service</div>
                            <div class="review-value">${formatValue(comm.previous_arms_service)}</div>
                        </div>
                    </div>
                </div>
            `;
}

// Generate Pre-Commission Services
function generatePreCommissionServices() {
  if (
    !personnelData.pre_commission_services ||
    personnelData.pre_commission_services.length === 0
  ) {
    return '<div class="section"><div class="section-title">PRE-COMMISSION SERVICES</div><p class="no-data">No pre-commission services information available</p></div>';
  }

  let html = `
                <div class="section">
                    <div class="section-title">PRE-COMMISSION SERVICES</div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Unit</th>
                                    <th>Designation</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

  personnelData.pre_commission_services.forEach((service) => {
    html += `
                    <tr>
                        <td>${formatValue(service.unit)}</td>
                        <td>${formatValue(service.designation)}</td>
                        <td>${formatDate(service.date_from)}</td>
                        <td>${formatDate(service.date_to)}</td>
                        <td>${formatValue(service.remarks)}</td>
                    </tr>
                `;
  });

  html += `
                        </tbody>
                    </table>
                    </div>
                </div>
            `;

  return html;
}

// Generate Pre-Commission Trainings
function generatePreCommissionTrainings() {
  if (
    !personnelData.pre_commission_trainings ||
    personnelData.pre_commission_trainings.length === 0
  ) {
    return '<div class="section"><div class="section-title">PRE-COMMISSION TRAININGS</div><p class="no-data">No pre-commission trainings information available</p></div>';
  }

  let html = `
                <div class="section">
                    <div class="section-title">PRE-COMMISSION TRAININGS</div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Location</th>
                                    <th>Appointment</th>
                                    <th>Distinction</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

  personnelData.pre_commission_trainings.forEach((training) => {
    html += `
                    <tr>
                        <td>${formatValue(training.location)}</td>
                        <td>${formatValue(training.appointment)}</td>
                        <td>${formatValue(training.distinction)}</td>
                        <td>${formatDate(training.date_from)}</td>
                        <td>${formatDate(training.date_to)}</td>
                        <td>${formatValue(training.remarks)}</td>
                    </tr>
                `;
  });

  html += `
                        </tbody>
                    </table>
                    </div>
                </div>
            `;

  return html;
}

// Generate Post Commission Training
function generatePostCommissionTraining() {
  if (
    !personnelData.post_commission_trainings ||
    personnelData.post_commission_trainings.length === 0
  ) {
    return '<div class="section"><div class="section-title">POST COMMISSION TRAINING</div><p class="no-data">No post commission training information available</p></div>';
  }

  let html = `
                <div class="section">
                    <div class="section-title">POST COMMISSION TRAINING</div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Course Name</th>
                                    <th>Location</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Result B Side</th>
                                    <th>Result Y Side</th>
                                    <th>Mark B Side</th>
                                    <th>Mark Y Side</th>
                                    <th>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

  personnelData.post_commission_trainings.forEach((training) => {
    html += `
                    <tr>
                        <td>${formatValue(training.training_type)}</td>
                        <td>${formatValue(training.course_name)}</td>
                        <td>${formatValue(training.location)}</td>
                        <td>${formatDate(training.date_from)}</td>
                        <td>${formatDate(training.date_to)}</td>
                        <td>${formatValue(training.result_b_side)} </td>
                        <td>${formatValue(training.result_y_side)}  </td>
                        <td> ${formatValue(training.mark_obtained_b_side)}</td>
                        <td> ${formatValue(training.mark_obtained_y_side)}</td>
                        <td>${formatValue(training.remarks)}</td>
                    </tr>
                `;
  });

  html += `
                        </tbody>
                    </table>
                </div>
            `;

  return html;
}

// Generate Additional Qualifications
function generateAdditionalQualifications() {
  if (
    !personnelData.additional_qualifications ||
    personnelData.additional_qualifications.length === 0
  ) {
    return '<div class="section"><div class="section-title">ADDITIONAL QUALIFICATIONS</div><p class="no-data">No additional qualifications information available</p></div>';
  }

  let html = `
                <div class="section">
                    <div class="section-title">ADDITIONAL QUALIFICATIONS</div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Qualification</th>
                                    <th>Date Obtained</th>
                                    <th>Authority</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

  personnelData.additional_qualifications.forEach((qual) => {
    html += `
                    <tr>
                        <td>${formatValue(qual.qualification)}</td>
                        <td>${formatDate(qual.date_obtained)}</td>
                        <td>${formatValue(qual.authority)}</td>
                    </tr>
                `;
  });

  html += `
                        </tbody>
                    </table>
                    </div>
                </div>
            `;

  return html;
}

// Generate Map Reading/Promotion Exams
function generateMapReadingExams() {
  if (
    !personnelData.map_reading_promotion_exams ||
    personnelData.map_reading_promotion_exams.length === 0
  ) {
    return '<div class="section"><div class="section-title">MAP READING & PROMOTION EXAMS</div><p class="no-data">No map reading and promotion exams information available</p></div>';
  }

  let html = `
                <div class="section">
                    <div class="section-title">MAP READING & PROMOTION EXAMS</div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Exam Name</th>
                                    <th>Passing Year</th>
                                    <th>Authority</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

  personnelData.map_reading_promotion_exams.forEach((exam) => {
    html += `
                    <tr>
                        <td>${formatValue(exam.exam_name)}</td>
                        <td>${formatValue(exam.passing_year)}</td>
                        <td>${formatValue(exam.authority)}</td>
                    </tr>
                `;
  });

  html += `
                        </tbody>
                    </table>
                    </div>
                </div>
            `;

  return html;
}

// Generate Promotions
function generatePromotions() {
  if (!personnelData.promotions || personnelData.promotions.length === 0) {
    return '<div class="section"><div class="section-title">PROMOTIONS</div><p class="no-data">No promotions information available</p></div>';
  }

  let html = `
                <div class="section">
                    <div class="section-title">PROMOTIONS</div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Rank</th>
                                    <th>Type</th>
                                    <th>Authority</th>
                                    <th>Order</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

  personnelData.promotions.forEach((promo) => {
    html += `
                    <tr>
                        <td>${formatDate(promo.promotion_date)}</td>
                        <td>${formatValue(promo.rank)}</td>
                        <td>${formatValue(promo.promotion_type)}</td>
                        <td>${formatValue(promo.authority)}</td>
                        <td>${formatValue(promo.order)}</td>
                    </tr>
                `;
  });

  html += `
                        </tbody>
                    </table>
                    </div>
                </div>
            `;

  return html;
}

// Generate Ranks Held
function generateRanksHeld() {
  if (!personnelData.ranks_held || personnelData.ranks_held.length === 0) {
    return '<div class="section"><div class="section-title">RANKS HELD</div><p class="no-data">No ranks held information available</p></div>';
  }

  let html = `
                <div class="section">
                    <div class="section-title">RANKS HELD</div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Rank</th>
                                    <th>Promotion Type</th>
                                    <th>Retrospective</th>
                                    <th>Notified</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

  personnelData.ranks_held.forEach((rank) => {
    html += `
                    <tr>
                        <td>${formatDate(rank.date)}</td>
                        <td>${formatValue(rank.rank)}</td>
                        <td>${formatValue(rank.promotion_type)}</td>
                        <td>${formatValue(rank.retrospective)}</td>
                        <td>${formatValue(rank.notified)}</td>
                    </tr>
                `;
  });

  html += `
                        </tbody>
                    </table>
                    </div>
                </div>
            `;

  return html;
}

// Generate Service Records
function generateServiceRecords() {
  if (
    !personnelData.service_records ||
    personnelData.service_records.length === 0
  ) {
    return '<div class="section"><div class="section-title">SERVICE RECORDS</div><p class="no-data">No service records information available</p></div>';
  }

  let html = `
                <div class="section">
                    <div class="section-title">SERVICE RECORDS</div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Appointment Type</th>
                                    <th>Appointment Name</th>
                                    <th>Service Type</th>
                                    <th>Unit/ERE</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

  personnelData.service_records.forEach((record) => {
    html += `
                    <tr>
                        <td>${formatDate(record.date_from)}</td>
                        <td>${formatDate(record.date_to) || "Present"}</td>
                        <td>${formatValue(record.appointment_type)}</td>
                        <td>${formatValue(record.appointment_name)}</td>
                        <td>${formatValue(record.service_type)}</td>
                        <td>${formatValue(record.unit_ere_name)}</td>
                    </tr>
                `;
  });

  html += `
                        </tbody>
                    </table>
                    </div>
                </div>
            `;

  return html;
}

// Generate Awards
function generateAwards() {
  let html = "";

  // Check if both award types are empty
  const hasOperationalAwards =
    personnelData.operational_awards &&
    personnelData.operational_awards.length > 0;
  const hasNonOperationalAwards =
    personnelData.non_operational_awards &&
    personnelData.non_operational_awards.length > 0;

  if (!hasOperationalAwards && !hasNonOperationalAwards) {
    return '<div class="section"><div class="section-title">AWARDS</div><p class="no-data">No awards information available</p></div>';
  }

  // Operational Awards
  if (
    personnelData.operational_awards &&
    personnelData.operational_awards.length > 0
  ) {
    html += `
                    <div class="section">
                        <div class="section-title">OPERATIONAL AWARDS</div>
                        <div class="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Operation Name</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Appointment</th>
                                        <th>Award</th>
                                        <th>Authority</th>
                                        <th>Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
            `;

    personnelData.operational_awards.forEach((award) => {
      html += `
                        <tr>
                            <td>${formatValue(award.operation_name)}</td>
                            <td>${formatDate(award.date_from)}</td>
                            <td>${formatDate(award.date_to)}</td>
                            <td>${formatValue(award.appointment)}</td>
                            <td>${formatValue(award.award_receive)}</td>
                            <td>${formatValue(award.authority)}</td>
                            <td>${formatValue(award.remarks)}</td>
                        </tr>
                    `;
    });

    html += `
                            </tbody>
                        </table>
                        </div>
                    </div>
                `;
  }

  // Non-Operational Awards
  if (
    personnelData.non_operational_awards &&
    personnelData.non_operational_awards.length > 0
  ) {
    html += `
                    <div class="section">
                        <div class="section-title">NON-OPERATIONAL AWARDS</div>
                        <div class="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Date</th>
                                        <th>Details</th>
                                        <th>Authority</th>
                                        <th>Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                `;

    personnelData.non_operational_awards.forEach((award) => {
      html += `
                        <tr>
                            <td>${formatValue(award.description)}</td>
                            <td>${formatDate(award.date_awarded)}</td>
                            <td>${formatValue(award.details)}</td>
                            <td>${formatValue(award.authority)}</td>
                            <td>${formatValue(award.remarks)}</td>
                        </tr>
                    `;
    });

    html += `
                            </tbody>
                        </table>
                        </div>
                    </div>
                `;
  }

  return html;
}

// Generate Overseas Visits
function generateOverseasVisits() {
  if (
    !personnelData.overseas_visits ||
    personnelData.overseas_visits.length === 0
  ) {
    return '<div class="section"><div class="section-title">OVERSEAS VISITS</div><p class="no-data">No overseas visits information available</p></div>';
  }

  let html = `
                <div class="section">
                    <div class="section-title">OVERSEAS VISITS</div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Visit Type</th>
                                    <th>Country</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Reason</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

  personnelData.overseas_visits.forEach((visit) => {
    html += `
                    <tr>
                        <td>${formatValue(visit.visit_type)}</td>
                        <td>${formatValue(visit.country)}</td>
                        <td>${formatDate(visit.start_date)}</td>
                        <td>${formatDate(visit.end_date)}</td>
                        <td>${formatValue(visit.reason)}</td>
                    </tr>
                `;
  });

  html += `
                        </tbody>
                    </table>
                    </div>
                </div>
            `;

  return html;
}

// Generate Passports
function generatePassports() {
  if (!personnelData.passports || personnelData.passports.length === 0) {
    return '<div class="section"><div class="section-title">PASSPORT INFORMATION</div><p class="no-data">No passport information available</p></div>';
  }

  let html = `
                <div class="section">
                    <div class="section-title">PASSPORT INFORMATION</div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>Passport Number</th>
                                    <th>Type</th>
                                    <th>Issue Date</th>
                                    <th>Expiry Date</th>
                                    <th>Authority</th>
                                    <th>Purpose</th>
                                    <th>Place of Issue</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

  personnelData.passports.forEach((passport) => {
    html += `
                    <tr>
                        <td>${formatValue(passport.status)}</td>
                        <td>${formatValue(passport.passport_number)}</td>
                        <td>${formatValue(passport.passport_type)}</td>
                        <td>${formatDate(passport.issue_date)}</td>
                        <td>${formatDate(passport.expiry_date)}</td>
                        <td>${formatValue(passport.authority)}</td>
                        <td>${formatValue(passport.purpose)}</td>
                        <td>${formatValue(passport.place_of_issue)}</td>
                    </tr>
                `;
  });

  html += `
                        </tbody>
                    </table>
                    </div>
                </div>
            `;

  return html;
}

// Generate Bank Accounts
function generateBankAccounts() {
  if (
    !personnelData.bank_accounts ||
    personnelData.bank_accounts.length === 0
  ) {
    return '<div class="section"><div class="section-title">BANK ACCOUNTS</div><p class="no-data">No bank accounts information available</p></div>';
  }

  let html = `
                <div class="section">
                    <div class="section-title">BANK ACCOUNTS</div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Bank Name</th>
                                    <th>Account Number</th>
                                    <th>Account Type</th>
                                    <th>Branch</th>
                                    <th>Opening Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

  personnelData.bank_accounts.forEach((account) => {
    html += `
                    <tr>
                        <td>${formatValue(account.bank_name)}</td>
                        <td>${formatValue(account.account_number)}</td>
                        <td>${formatValue(account.account_type)}</td>
                        <td>${formatValue(account.branch)}</td>
                        <td>${formatDate(account.opening_date)}</td>
                        <td>${account.closing_date ? "Closed" : "Active"}</td>
                    </tr>
                `;
  });

  html += `
                        </tbody>
                    </table>
                    </div>
                </div>
            `;

  return html;
}

// Generate Annual Income
function generateAnnualIncome() {
  if (
    !personnelData.annual_incomes ||
    personnelData.annual_incomes.length === 0
  ) {
    return '<div class="section"><div class="section-title">ANNUAL INCOME</div><p class="no-data">No annual income information available</p></div>';
  }

  let html = `
                <div class="section">
                    <div class="section-title">ANNUAL INCOME</div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Income Source</th>
                                    <th>Amount (BDT)</th>
                                    <th>Year</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

  personnelData.annual_incomes.forEach((income) => {
    html += `
                    <tr>
                        <td>${formatValue(income.income_source)}</td>
                        <td>${formatValue(income.amount)}</td>
                        <td>${formatValue(income.year)}</td>
                    </tr>
                `;
  });

  html += `
                        </tbody>
                    </table>
                    </div>
                </div>
            `;

  return html;
}

// Generate Medical History
function generateMedicalHistory() {
  if (
    !personnelData.medical_histories ||
    personnelData.medical_histories.length === 0
  ) {
    return '<div class="section"><div class="section-title">MEDICAL HISTORY</div><p class="no-data">No medical history information available</p></div>';
  }

  let html = `
                <div class="section">
                    <div class="section-title">MEDICAL HISTORY</div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Disease/Injury</th>
                                    <th>Nature</th>
                                    <th>Admission From</th>
                                    <th>Admission To</th>
                                    <th>Medical Category</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

  personnelData.medical_histories.forEach((medical) => {
    html += `
                    <tr>
                        <td>${formatValue(medical.name_of_disease)}</td>
                        <td>${formatValue(medical.nature_of_injury)}</td>
                        <td>${formatDate(medical.admission_from)}</td>
                        <td>${formatDate(medical.admission_to)}</td>
                        <td>${formatValue(medical.medical_category_class)}</td>
                    </tr>
                `;
  });

  html += `
                        </tbody>
                    </table>
                    </div>
                </div>
            `;

  return html;
}

// Generate Military Legal Records
function generateMilitaryLegalRecords() {
  if (
    !personnelData.military_legal_records ||
    personnelData.military_legal_records.length === 0
  ) {
    return '<div class="section"><div class="section-title">MILITARY LEGAL RECORDS</div><p class="no-data">No military legal records information available</p></div>';
  }

  let html = `
                <div class="section">
                    <div class="section-title">MILITARY LEGAL RECORDS</div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

  personnelData.military_legal_records.forEach((record) => {
    html += `
                    <tr>
                        <td>${formatValue(record.military_legal_type)}</td>
                        <td>${formatValue(record.military_legal_name)}</td>
                        <td>${formatDate(record.date)}</td>
                        <td>${formatValue(record.remarks)}</td>
                    </tr>
                `;
  });

  html += `
                        </tbody>
                    </table>
                    </div>
                </div>
            `;

  return html;
}

// Generate Civil Legal Records
function generateCivilLegalRecords() {
  if (
    !personnelData.civil_legal_records ||
    personnelData.civil_legal_records.length === 0
  ) {
    return '<div class="section"><div class="section-title">CIVIL LEGAL RECORDS</div><p class="no-data">No civil legal records information available</p></div>';
  }

  let html = `
                <div class="section">
                    <div class="section-title">CIVIL LEGAL RECORDS</div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Law Section</th>
                                    <th>Crime Details</th>
                                    <th>Date of Judgment</th>
                                    <th>Place</th>
                                    <th>Punishment</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

  personnelData.civil_legal_records.forEach((record) => {
    html += `
                    <tr>
                        <td>${formatValue(record.law_section)}</td>
                        <td>${formatValue(record.crime_details)}</td>
                        <td>${formatDate(record.date_judgment)}</td>
                        <td>${formatValue(record.place)}</td>
                        <td>${formatValue(record.punishment)}</td>
                    </tr>
                `;
  });

  html += `
                        </tbody>
                    </table>
                    </div>
                </div>
            `;

  return html;
}

// Main function to render all content
function renderContent() {
  const contentDiv = document.getElementById("popupContent");

  let allContent = "";
  allContent += generatePersonalreview();
  allContent += generateAddresses();
  allContent += generateLanguageSkills();
  allContent += generateFamilyMembers();
  allContent += generateEducation();
  allContent += generateCommission();
  allContent += generatePreCommissionServices();
  allContent += generatePreCommissionTrainings();
  allContent += generatePostCommissionTraining();
  allContent += generateAdditionalQualifications();
  allContent += generateMapReadingExams();
  allContent += generatePromotions();
  allContent += generateRanksHeld();
  allContent += generateServiceRecords();
  allContent += generateAwards();
  allContent += generateOverseasVisits();
  allContent += generatePassports();
  allContent += generateBankAccounts();
  allContent += generateAnnualIncome();
  allContent += generateMedicalHistory();
  allContent += generateMilitaryLegalRecords();
  allContent += generateCivilLegalRecords();

  contentDiv.innerHTML = allContent;

  // Update header
  document.getElementById("headerName").textContent =
    personnelData.person?.name || "Personnel Information Review";
  document.getElementById("headerDetails").textContent =
    `Personal No: ${personnelData.person?.personal_no || "N/A"}`;
}

window.onload = () => {
  // Initialize button visibility for all tables
  initializeTableButtons();

  // Mark required headers after initialization
  setTimeout(markRequiredHeaders, 100);
};
