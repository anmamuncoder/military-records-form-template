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
        account_types: [
          "Savings",
          "Current",
          "Fixed Deposit",
          "Salary Account",
        ],
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
        let html = `<select name="${name}" ${
          required ? "required" : ""
        }><option value="">Select</option>`;
        opts.forEach(
          (opt) => (html += `<option value="${opt}">${opt}</option>`)
        );
        return html + "</select>";
      }

      function createInput(
        type,
        name,
        placeholder = "",
        required = false,
        maxLength = null
      ) {
        const maxAttr = maxLength ? ` maxlength="${maxLength}"` : "";
        return `<input type="${type}" name="${name}" placeholder="${placeholder}" ${
          required ? "required" : ""
        }${maxAttr}>`;
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
          row.innerHTML = `<td>${createSelect(
            "address_type",
            options.address_types,
            true
          )}</td>
      <td>${createInput("text", "street_address", "Street Address", true)}</td>
      <td>${createInput("text", "city", "City", false, 100)}</td>
      <td>${createInput("text", "state", "State", false, 100)}</td>
      <td>${createInput("text", "postal_code", "Postal Code", false, 20)}</td>
      <td>${createInput("text", "country", "Country", false, 100)}</td>
      <td>${createInput("date", "date", "", false)}</td>
      <td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
        } else if (type === "language_skills") {
          row.innerHTML = `<td>${createInput(
            "text",
            "language",
            "Language",
            true,
            50
          )}</td>
      <td>${createSelect("proficiency", options.proficiency_levels, false)}</td>
      <td>${createSelect(
        "reading_skill",
        options.proficiency_levels,
        false
      )}</td>
      <td>${createSelect(
        "writing_skill",
        options.proficiency_levels,
        false
      )}</td>
      <td>${createSelect(
        "speaking_skill",
        options.proficiency_levels,
        false
      )}</td>
      <td>${createSelect("acquiring_skill", options.acquiring, false)}</td>
      <td>${createInput("text", "remarks", "Remarks", false)}</td>
      <td>${createInput("text", "institution", "Institution", false, 100)}</td>
      <td>${createInput("number", "year", "Year", false)}</td>
      <td>${createInput("text", "degree", "Degree", false, 100)}</td>
      <td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
        } else if (type === "family_members") {
          row.innerHTML = `<td>${createSelect(
            "relationship",
            options.relationships,
            true
          )}</td>
      <td>${createInput("text", "name", "Name", true, 200)}</td>
      <td>${createInput("text", "nationality", "Nationality", false, 50)}</td>
      <td>${createInput("date", "date_of_birth", "", false)}</td>
      <td>${createSelect("is_deceased", ["false", "true"], true)}</td>
      <td>${createInput(
        "text",
        "occupation_profession",
        "Occupation",
        false,
        100
      )}</td>
      <td>${createInput("number", "annual_income", "Annual Income", false)}</td>
      <td>${createInput("text", "address", "Address", false)}</td>
      <td>${createInput(
        "text",
        "birth_registration",
        "Birth Registration",
        false,
        100
      )}</td>
      <td>${createInput("text", "national_id", "National ID", false, 20)}</td>
      <td>${createInput("text", "education", "Education", false, 200)}</td>
      <td>${createSelect("dependency", ["true", "false"], false)}</td>
      <td>${createSelect("sex", options.sex, false)}</td>
      <td>${createInput("date", "date_of_expire", "")}</td>
      <td>${createInput(
        "text",
        "location_of_grave",
        "Location of Grave",
        false,
        100
      )}</td>
      <td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
        } else if (type === "education") {
          row.innerHTML = `<td>${createSelect(
            "institution_type",
            options.education_types,
            true,
            10
          )}</td>
      <td>${createInput(
        "text",
        "institution_name",
        "Institution Name",
        true,
        200
      )}</td>
      <td>${createInput("date", "start_date", "", false)}</td>
      <td>${createInput("date", "end_date", "", false)}</td>
      <td>${createInput(
        "text",
        "examination_passed",
        "Examination Passed",
        false,
        100
      )}</td>
      <td>${createInput("text", "subjects", "Subjects", false)}</td>
      <td>${createInput("number", "gpa", "GPA", false)}</td>
      <td>${createSelect("division", options.divisions, false)}</td>
      <td>${createInput("number", "year_of_passing", "Year", false)}</td>
      <td>${createInput("text", "remarks", "Remarks", true)}</td>
      <td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
        } else if (type === "passports") {
          row.innerHTML = `<td>${createSelect(
            "status",
            options.passport_status,
            false
          )}</td>
      <td>${createInput(
        "text",
        "passport_number",
        "Passport Number",
        true,
        50
      )}</td>
      <td>${createInput("date", "issue_date", "", false)}</td>
      <td>${createInput("date", "expiry_date", "", false)}</td>
      <td>${createInput("text", "authority", "Authority", false, 100)}</td>
      <td>${createSelect("passport_type", options.passport_types, false)}</td>
      <td>${createSelect("purpose", options.passport_purposes, false)}</td>
      <td>${createInput(
        "text",
        "place_of_issue",
        "Place of Issue",
        false,
        100
      )}</td>
      <td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
        } else if (type === "medical_histories") {
          row.innerHTML = `<td>${createInput(
            "text",
            "name_of_disease",
            "Disease Name",
            true
          )}</td>
      <td>${createSelect(
        "nature_of_injury",
        options.nature_of_injury,
        true
      )}</td>
      <td>${createInput(
        "date",
        "date_of_medical_admission_from",
        "",
        false
      )}</td>
      <td>${createInput("date", "date_of_medical_admission_to", "", false)}</td>
      <td>${createSelect(
        "medical_category_class",
        options.medical_category_class,
        false
      )}</td>
      <td>${createInput("date", "medical_category_from", "", false)}</td>
      <td>${createInput("date", "medical_category_to", "", false)}</td>
      <td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
        } else if (type === "pre_commission_services") {
          row.innerHTML = `<td>${createInput(
            "text",
            "unit",
            "Unit",
            true,
            100
          )}</td>
      <td>${createInput("text", "designation", "Designation", true, 100)}</td>
      <td>${createInput("date", "date_from", "", false)}</td>
      <td>${createInput("date", "date_to", "", false)}</td>
      <td>${createInput("text", "remarks", "Remarks", true)}</td>
      <td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
        } else if (type === "pre_commission_trainings") {
          row.innerHTML = `<td>${createInput(
            "text",
            "location",
            "Location",
            true,
            100
          )}</td>
      <td>${createInput("text", "appointment", "Appointment", true, 100)}</td>
      <td>${createInput("text", "distinction", "Distinction", true)}</td>
      <td>${createInput("text", "remarks", "Remarks", true)}</td>
      <td>${createInput("date", "date_from", "", false)}</td>
      <td>${createInput("date", "date_to", "", false)}</td>
      <td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
        } else if (type === "post_commission_trainings") {
          row.innerHTML = `<td>${createSelect(
            "training_type",
            options.training_types,
            true
          )}</td>
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
          row.innerHTML = `<td>${createInput(
            "text",
            "qualification",
            "Qualification",
            true,
            200
          )}</td>
      <td>${createInput("date", "date_obtained", "", true)}</td>
      <td>${createInput("text", "authority", "Authority", true, 100)}</td>
      <td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
        } else if (type === "map_reading_promotion_exams") {
          row.innerHTML = `<td>${createInput(
            "text",
            "exam_name",
            "Exam Name",
            true,
            100
          )}</td>
      <td>${createInput("number", "passing_year", "Passing Year", true)}</td>
      <td>${createInput("text", "authority", "Authority", false, 100)}</td>
      <td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
        } else if (type === "promotions") {
          row.innerHTML = `<td>${createInput(
            "date",
            "promotion_date",
            "",
            true
          )}</td>
      <td>${createSelect("promotion_type", options.promotion_types, true)}</td>
      <td>${createSelect("rank", options.ranks, true)}</td>
      <td>${createInput("text", "authority", "Authority", false, 100)}</td>
      <td>${createInput("text", "order", "Order", false, 50)}</td>
      <td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
        } else if (type === "service_records") {
          row.innerHTML = `<td>${createInput(
            "date",
            "date_from",
            "",
            true
          )}</td>
      <td>${createInput("date", "date_to", "")}</td>
      <td>${createSelect("appointment_type", options.appointment_types)}</td>
      <td>${createInput("text", "appointment_name", "Appointment Name")}</td>
       <td>${createSelect("service_type", options.service_type, true)}</td>
      <td>${createInput(
        "text",
        "unit_ere_name",
        "Unit/ERE Name",
        true,
        100
      )}</td>
      <td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
        } else if (type === "operational_awards") {
          row.innerHTML = `<td>${createInput(
            "text",
            "operation_name",
            "Operation Name",
            true,
            200
          )}</td>
      <td>${createInput("date", "date_from", "", false)}</td>
      <td>${createInput("date", "date_to", "", false)}</td>
      <td>${createInput("text", "appointment", "Appointment", true, 100)}</td>
      <td>${createInput("text", "award_receive", "Award Receive", true)}</td>
      <td>${createInput("text", "authority", "Authority", false, 100)}</td>
      <td>${createInput("text", "remarks", "Remarks", true)}</td>
      <td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
        } else if (type === "non_operational_awards") {
          row.innerHTML = `<td>${createInput(
            "text",
            "description",
            "Description",
            true
          )}</td>
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
          row.innerHTML = `<td>${createInput(
            "text",
            "person",
            "Person",
            true
          )}</td>
      <td>${createSelect("income_source", options.income_sources, true)}</td>
      <td>${createInput("number", "amount", "Amount", true)}</td>
      <td>${createInput("number", "year", "Year", true)}</td>
      <td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
        } else if (type === "bank_accounts") {
          row.innerHTML = `<td>${createInput(
            "text",
            "bank_name",
            "Bank Name",
            true,
            100
          )}</td>
      <td>${createInput("text", "account_number", "Account Number", true)}</td>
      <td>${createSelect("account_type", options.account_types, true)}</td>
      <td>${createInput("text", "branch", "Branch", true, 100)}</td>
      <td>${createInput("date", "opening_date", "", false)}</td>
      <td>${createInput("date", "closing_date", "")}</td>
      <td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
        } else if (type === "military_legal_records") {
          row.innerHTML = `<td>${createSelect(
            "military_legal_type",
            options.military_legal_type,
            true
          )}</td>
      <td>${createSelect(
        "military_legal_name",
        options.military_legal_name,
        true
      )}</td>
      <td>${createInput("text", "remarks", "Remarks")}</td>
      <td>${createInput("date", "date", "", true)}</td>
      <td style="text-align:center;"><button type="button" onclick="deleteRow(this)" class="btn btn-danger">Remove</button></td>`;
        } else if (type === "civil_legal_records") {
          row.innerHTML = `<td>${createInput(
            "text",
            "law_section",
            "Law Section",
            true,
            100
          )}</td>
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
        let addFirstBtnContainer = section.querySelector(
          ".add-first-row-container"
        );
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
              tableContainer.firstChild
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
              if (
                name === "annual_income" ||
                name === "amount" ||
                name === "gpa"
              ) {
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
            const input = Array.from(inputs).find(
              (inp) => inp.name === fieldName
            );
            if (!input) return;

            let value = input.value.trim();

            // Handle boolean fields (is_deceased) - they should have "true" or "false" value
            if (fieldName === "is_deceased") {
              if (!value || value === "" || value === "Select") {
                const rowNum = index + 1;
                const friendlyFieldName = "Is Deceased";
                errors.push(
                  `${sectionName} - Entry ${rowNum}: ${friendlyFieldName}`
                );
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
              errors.push(
                `${sectionName} - Entry ${rowNum}: ${friendlyFieldName}`
              );
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
        if (!getValue("person_personal_no"))
          errors.push("Person - Personal No");

        // Validate Personal Info section
        if (!getValue("national_id_number"))
          errors.push("Personal Info - National ID Number");

        // Validate Address
        errors.push(
          ...validateTableRequiredFields(
            "addresses",
            ["address_type", "street_address"],
            "Address"
          )
        );

        // Validate Language Skills
        errors.push(
          ...validateTableRequiredFields(
            "language_skills",
            ["language"],
            "Language Skill"
          )
        );

        // Validate Family Members
        errors.push(
          ...validateTableRequiredFields(
            "family_members",
            ["relationship", "name", "is_deceased"],
            "Family Member"
          )
        );

        // Validate Education
        errors.push(
          ...validateTableRequiredFields(
            "education",
            ["institution_type", "institution_name", "remarks"],
            "Education"
          )
        );

        // Validate Passports
        errors.push(
          ...validateTableRequiredFields(
            "passports",
            ["passport_number"],
            "Passport"
          )
        );

        // Validate Medical Histories
        errors.push(
          ...validateTableRequiredFields(
            "medical_histories",
            ["name_of_disease", "nature_of_injury"],
            "Medical History"
          )
        );

        // Validate Pre Commission Services
        errors.push(
          ...validateTableRequiredFields(
            "pre_commission_services",
            ["unit", "designation", "remarks"],
            "Pre Commission Service"
          )
        );

        // Validate Pre Commission Trainings
        errors.push(
          ...validateTableRequiredFields(
            "pre_commission_trainings",
            ["location", "appointment", "distinction", "remarks"],
            "Pre Commission Training"
          )
        );

        // Validate Commission section
        if (!getValue("academy_course"))
          errors.push("Commission - Academy Course");
        if (!getValue("commission_type"))
          errors.push("Commission - Commission Type");
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
            "Post Commission Training"
          )
        );

        // Validate Additional Qualifications
        errors.push(
          ...validateTableRequiredFields(
            "additional_qualifications",
            ["qualification", "date_obtained", "authority"],
            "Additional Qualification"
          )
        );

        // Validate Map Reading Promotion Exams
        errors.push(
          ...validateTableRequiredFields(
            "map_reading_promotion_exams",
            ["exam_name", "passing_year"],
            "Map Reading Promotion Exam"
          )
        );

        // Validate Promotions
        errors.push(
          ...validateTableRequiredFields(
            "promotions",
            ["promotion_date", "promotion_type", "rank"],
            "Promotion"
          )
        );

        // Validate Service Records
        errors.push(
          ...validateTableRequiredFields(
            "service_records",
            ["date_from", "service_type", "unit_ere_name"],
            "Service Record"
          )
        );

        // Validate Operational Awards
        errors.push(
          ...validateTableRequiredFields(
            "operational_awards",
            ["operation_name", "appointment", "award_receive", "remarks"],
            "Operational Award"
          )
        );

        // Validate Non Operational Awards
        errors.push(
          ...validateTableRequiredFields(
            "non_operational_awards",
            ["description", "date_awarded", "details", "authority", "remarks"],
            "Non Operational Award"
          )
        );

        // Validate Overseas Visits
        errors.push(
          ...validateTableRequiredFields(
            "overseas_visits",
            [ 
              "visit_type",
              "country",
              "start_date",
              "end_date",
              "reason",
            ],
            "Overseas Visit"
          )
        );

        // Validate Annual Incomes
        errors.push(
          ...validateTableRequiredFields(
            "annual_incomes",
            ["person", "income_source", "amount", "year"],
            "Annual Income"
          )
        );

        // Validate Bank Accounts
        errors.push(
          ...validateTableRequiredFields(
            "bank_accounts",
            ["bank_name", "account_number", "account_type", "branch"],
            "Bank Account"
          )
        );

        // Validate Military Legal Records
        errors.push(
          ...validateTableRequiredFields(
            "military_legal_records",
            ["date", "military_legal_type", "military_legal_name"],
            "Military Legal Record"
          )
        );

        // Validate Civil Legal Records
        errors.push(
          ...validateTableRequiredFields(
            "civil_legal_records",
            ["law_section", "crime_details", "place", "punishment"],
            "Civil Legal Record"
          )
        );

        // Validate Ranks Held
        errors.push(
          ...validateTableRequiredFields(
            "ranks_held",
            ["date", "promotion_type", "rank"],
            "Ranks Held"
          )
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
            present_nature_of_disability: getValue(
              "present_nature_of_disability"
            ),
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
            permanent_commission_date: getDateValue(
              "permanent_commission_date"
            ),
            permanent_commission_authority: getValue(
              "permanent_commission_authority"
            ),
            date_of_joining_bangladesh_army: getDateValue(
              "date_of_joining_bangladesh_army"
            ),
            joining_bangladesh_army_authority: getValue(
              "joining_bangladesh_army_authority"
            ),
            original_arms_service: getValue("original_arms_service") || null,
            previous_arms_service: getValue("previous_arms_service") || null,
          },
          post_commission_trainings: getTableData("post_commission_trainings"),
          additional_qualifications: getTableData("additional_qualifications"),
          map_reading_promotion_exams: getTableData(
            "map_reading_promotion_exams"
          ),
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

        // First stringify the data
        let jsonString = JSON.stringify(data, null, 2);

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
          jsonString = jsonString.replace(
            regex,
            (match, prefix, number, suffix) => {
              return `${prefix}${parseFloat(number).toFixed(1)}${suffix}`;
            }
          );
        });

        const blob = new Blob([jsonString], {
          type: "application/json",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download =
          `${data.person.personal_no}-RECORD.json` || "unknown_record.json";
        link.click();
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

      window.onload = () => {
        // Initialize button visibility for all tables
        initializeTableButtons();

        // Mark required headers after initialization
        setTimeout(markRequiredHeaders, 100);
      };
