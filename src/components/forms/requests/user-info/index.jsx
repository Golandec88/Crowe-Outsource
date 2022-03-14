import Generator from "@forms/generator";

export default function UserInfo () {
  return <>
    <Generator schema={[
      {
        cols: 6,
        child: [{
          type: "title",
          props: {
            text: "Информация о пользователе:",
            size: "small"
          }
        }, {
          type: "text",
          props: {
            name: "name",
            label: "Имя",
            fullWidth: true
          }
        }, {
          type: "text",
          props: {
            name: "surname",
            label: "Фамилия",
            fullWidth: true
          }
        }, {
          type: "text",
          props: {
            name: "patronymic",
            label: "Отчество",
            fullWidth: true
          }
        }, {
          type: "text",
          props: {
            name: "pinfl",
            label: "ИНН / ПИНФЛ физ. лица",
            fullWidth: true
          }
        }]
      },
      {
        cols: 6,
        child: [{
          type: "title",
          props: {
            text: "Серия и номер пасспорта:",
            size: "small"
          }
        }, {
          type: "text",
          props: {
            name: "passport",
            label: "Серия и номер",
            fullWidth: true
          }
        }, {
          type: "date",
          props: {
            name: "dateOfBirth",
            label: "Дата рождения",
            fullWidth: true
          }
        }, {
          type: "title",
          props: {
            text: "Срок действия паспорта: ",
            size: "small",
          }
        }, {
          type: "date",
          cols: 6,
          props: {
            name: "passportDateFrom",
            label: "Дата (от)",
            fullWidth: true
          }
        }, {
          type: "date",
          cols: 6,
          props: {
            name: "passportExpireDate",
            label: "Дата (до)",
            fullWidth: true
          }
        }]
      },
      {
        cols: 12,
        child: [{
          type: "text",
          props: {
            name: "address",
            cols: 12,
            label: "Адрес прописки",
            fullWidth: true
          }
        }, {
          type: "text",
          cols: 6,
          props: {
            name: "phone",
            label: "Телефон",
            fullWidth: true
          },
        }, {
          type: "text",
          cols: 6,
          props: {
            name: "email",
            label: "EMail",
            fullWidth: true
          }
        }]
      }
    ]}/>
  </>;
}