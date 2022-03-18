import Generator from "@components/forms/generator";

export default function CompanyInfo() {
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
            fullWidth: true
          }
        }]
      },
      {
        cols: 12,
        child: [{
          type: "title",
          props: {
            text: "Срок действия договора",
            size: "small"
          }
        }, {
          type: "date",
          cols: 6,
          props: {
            name: "trustDateFrom",
            label: "Дата (от)",
            fullWidth: true
          }
        }, {
          type: "date",
          cols: 6,
          props: {
            name: "trustDateOfExpire",
            label: "Дата (до)",
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
          }
        }, {
          type: "date",
          cols: 6,
          props: {
            name: "paymentDate",
            label: "Дата оплаты",
            fullWidth: true
          }
        }, {
          type: "text",
          cols: 6,
          props: {
            name: "sum",
            label: "Сумма",
            fullWidth: true
          }
        },
        {
          type: "title",
          props: {
            text: "Прочая информация",
            size: "small",
          }
        },{
          type: "text",
          cols: 6,
          props: {
            name: "tin",
            label: "ИНН",
            fullWidth: true
          }
        }, {
          type: "text",
          cols: 6,
          props: {
            name: "oked",
            label: "ОКЕД",
            fullWidth: true
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
            fullWidth: true
          }
        }, {
          type: "text",
          cols: 6,
          props: {
            name: "regCode",
            label: "НДС регистрационный номер",
            fullWidth: true
          }
        }, {
          type: "text",
          cols: 6,
          props: {
            name: "account",
            label: "Банковский счёт",
            fullWidth: true
          }
        }, {
          type: "text",
          cols: 3,
          props: {
            name: "mfo",
            label: "МФО",
            fullWidth: true
          }
        }, {
          type: "text",
          cols: 9,
          props: {
            name: "bank",
            label: "Банк",
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
            fullWidth: true
          }
        }, {
          type: "text",
          cols: 6,
          props: {
            name: "accountant",
            label: "Главный Бухгалтер",
            fullWidth: true
          }
        }, {
          type: "text",
          cols: 6,
          props: {
            name: "phone",
            label: "Телефон",
            fullWidth: true
          }
        }, {
          type: "text",
          cols: 6,
          props: {
            name: "email",
            label: "EMail",
            fullWidth: true
          }
        }
        ]
      }
    ]}/>
  </>;
}
