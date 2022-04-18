class FormService {
	constructor(formData, validClass, invalidClass) {
		this.form = this._generateForm(formData);
		this.validator = formData;
		this.validClass = validClass;
		this.invalidClass = invalidClass;
		this._valid = false;
		this._bindValuesToDOM();
		this._applyValidator();
	}

	_generateForm = (formData) => {
		let form = {};
		Object.keys(formData).forEach((field) => {
			return (form[`${field}`] = "");
		});

		return form;
	};

	_bindValuesToDOM = () => {
		Object.keys(this.form).forEach((field) => {
			const node = document.querySelector(`.${field}`);

			this.form[`${field}`] = node.value;

			node.addEventListener("keyup", () => {
				this.form[`${field}`] = node.value;
			});
		});
	};

	_applyValidator = () => {
		this.submitButton.addEventListener("click", () => {
			Object.entries(this.validator).forEach(([field, validRegExp]) => {
				const node = document.querySelector(`.${field}`);

				new RegExp(validRegExp).test(this.form[`${field}`])
					? node.classList.add(this.validClass)
					: node.classList.add(this.invalidClass);
			});
		});
	};

	get isValid() {
		const validFields = document.querySelectorAll(".valid");

		return validFields.length === Object.keys(this.form).length ? true : false;
	}

	get submitButton() {
		return document.querySelector(".submit");
	}

    get values() {
        return Object.values(this.form)
    }
}

const formHTMLClasses = {
	lfm: "^[А-Я][а-я]{1,20} [А-Я].[А-Я].$",
	group: "^[А-ЯЁ]{2}-[0-9]{2}$",
	idCard: "^[A-Z]{2} [0-9]{6}$",
	dateOfBirth: "^[0-9]{2}.[0-9]{2}.[0-9]{4}$",
	email: "^[a-zA-Z0-9.!#$%&`*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
};

const userForm = new FormService(formHTMLClasses, "valid", "invalid");
const outputContainer = document.querySelector('.output-container')
let visible = false

userForm.submitButton.addEventListener("click", () => {
	if (userForm.isValid && !visible) {
        userForm.values.forEach(value => {
            outputItem = document.createElement('span')
            outputItem.innerHTML = value
            outputContainer.appendChild(outputItem)
        })
        
        visible = true
    }
});
