import Generator from "@components/forms/generator";
import formRules from "@utils/validation-rules";
import proptypes from "prop-types";

export default function CompanyInfo({ form }) {
  return <>
    <Generator schema={[
      {
        cols: 12,
        child: [{
          type: "title",
          props: {
            text: "Информация о компании",
            size: "small",
          }
        }, {
          type: "text",
          props: {
            name: "name",
            label: "Наименование организации",
            fullWidth: true,
            rules: [formRules.required],
            value: form?.request.companyInfo.name
          }
        }]
      },
      {
        cols: 12,
        child: [{
          type: "title",
          props: {
            text: "Срок действия договора",
            size: "small",
          }
        }, {
          type: "date",
          cols: 6,
          props: {
            name: "trustDateFrom",
            label: "Дата (от)",
            rules: [formRules.required],
            value: form?.request.contractInfo.validityPeriod.startDate,
            fullWidth: true
          }
        }, {
          type: "date",
          cols: 6,
          props: {
            name: "trustDateOfExpire",
            label: "Дата (до)",
            rules: [formRules.required],
            value: form?.request.contractInfo.validityPeriod.endDate,
            fullWidth: true
          }
        }]
      }, {
        cols: 12,
        child: [{
          type: "title",
          props: {
            text: "Последняя оплата",
            size: "small",
            value: form?.request.contractInfo.validityPeriod.startDate,
          }
        }, {
          type: "date",
          cols: 6,
          props: {
            name: "paymentDate",
            label: "Дата оплаты",
            fullWidth: true,
            rules: [formRules.required],
            value: form?.request.contractInfo.lastPayment.paymentDate
          }
        }, {
          type: "text",
          cols: 6,
          props: {
            name: "sum",
            label: "Сумма",
            fullWidth: true,
            rules: [formRules.required],
            value: form?.request.contractInfo.lastPayment.amount
          }
        },
        {
          type: "title",
          props: {
            text: "Прочая информация",
            size: "small",
          }
        }, {
          type: "text",
          cols: 6,
          props: {
            name: "tin",
            label: "ИНН",
            fullWidth: true,
            rules: [formRules.required],
            value: form?.request.companyInfo.tin
          }
        }, {
          type: "text",
          cols: 6,
          props: {
            name: "oked",
            label: "ОКЕД",
            fullWidth: true,
            rules: [formRules.required],
            value: form?.request.companyInfo.oked
          }
        }]
      }, {
        cols: 12,
        child: [{
          type: "text",
          cols: 12,
          props: {
            name: "address",
            label: "Адресс организации",
            rules: [formRules.required],
            value: form?.request.companyInfo.address,
            fullWidth: true
          }
        }, {
          type: "text",
          cols: 6,
          props: {
            name: "regCode",
            label: "НДС регистрационный номер",
            rules: [formRules.required],
            value: form?.request.companyInfo.nds,
            fullWidth: true
          }
        }, {
          type: "text",
          cols: 6,
          props: {
            name: "account",
            label: "Банковский счёт",
            rules: [formRules.required],
            value: form?.request.companyInfo.bank.account,
            fullWidth: true
          }
        }, {
          type: "text",
          cols: 3,
          props: {
            name: "mfo",
            label: "МФО",
            rules: [formRules.required],
            value: form?.request.companyInfo.bank.mfo,
            fullWidth: true
          }
        }, {
          type: "text",
          cols: 9,
          props: {
            name: "bank",
            label: "Банк",
            value: form?.request.companyInfo.bank.name,
            fullWidth: true
          }
        }]
      }, {
        cols: 12,
        child: [{
          type: "text",
          cols: 6,
          props: {
            name: "director",
            label: "Директор",
            value: form?.request.companyInfo.director,
            fullWidth: true
          }
        }, {
          type: "text",
          cols: 6,
          props: {
            name: "accountant",
            label: "Главный Бухгалтер",
            value: form?.request.companyInfo.headAccountant,
            fullWidth: true
          }
        }, {
          type: "text",
          cols: 6,
          props: {
            name: "phone",
            label: "Телефон",
            value: form?.request.companyInfo.phone,
            fullWidth: true
          }
        }, {
          type: "text",
          cols: 6,
          props: {
            name: "email",
            label: "EMail",
            value: form?.request.companyInfo.email,
            fullWidth: true
          }
        }
        ]
      }
    ]}/>
  </>;
}


CompanyInfo.propTypes = {
  form: proptypes.object
};