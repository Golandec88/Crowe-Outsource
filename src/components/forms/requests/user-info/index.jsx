import Generator from "@forms/generator";
import formRules from "@utils/validation-rules";
import proptypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getInfo } from "@modules/request/creators";

export default function UserInfo({ form }) {
  const dispatch = useDispatch();
  const [{ name, lastname, surname }, setNames] = useState({
    name: "",
    lastname: "",
    surname: ""
  });

  useEffect(() => {
    updateName(form, setNames, dispatch);
  }, [dispatch, form]);

  return <Generator schema={[
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
          name: "request.companyInfo.director[0]",
          label: "Имя",
          fullWidth: true,
          rules: [formRules.required],
          value: name
        }
      }, {
        type: "text",
        props: {
          name: "request.companyInfo.director[1]",
          label: "Фамилия",
          rules: [formRules.required],
          fullWidth: true,
          value: lastname
        }
      }, {
        type: "text",
        props: {
          name: "request.companyInfo.director[2]",
          label: "Отчество",
          rules: [formRules.required],
          fullWidth: true,
          value: surname
        }
      }]
    },
    {
      cols: 6,
      child: [{
        type: "title",
        props: {
          text: "Серия и номер пасспорта:",
          size: "small",
        }
      }, {
        type: "text",
        props: {
          name: "passport",
          label: "Серия и номер",
          rules: [formRules.required],
          value: form?.passportData.serialAndNumber,
          fullWidth: true
        }
      },
      {
        type: "text",
        props: {
          name: "givenPlace",
          label: "Кем выдано",
          rules: [formRules.required],
          value: form?.passportData.givenPlace,
          fullWidth: true
        }
      }, {
        type: "date",
        cols: 6,
        props: {
          name: "givenDate",
          label: "Срок (от)",
          rules: [formRules.required],
          fullWidth: true,
          value: form?.passportData.givenDate
        }
      }, {
        type: "date",
        cols: 6,
        props: {
          name: "expireDate",
          label: "Срок (до)",
          rules: [formRules.required],
          fullWidth: true,
          value: form?.passportData.expireDate
        }
      }]
    },
    {
      cols: 12,
      child: [{
        type: "text",
        props: {
          cols: 12,
          name: "passportData.pinfl",
          label: "ИНН / ПИНФЛ физ. лица",
          rules: [formRules.required],
          fullWidth: true,
          value: form?.passportData.pinfl
        }
      }, {
        type: "text",
        props: {
          name: "address",
          cols: 12,
          label: "Адрес прописки",
          value: form?.passportData.registration,
          fullWidth: true
        }
      }, {
        type: "text",
        cols: 6,
        props: {
          name: "phone",
          label: "Телефон",
          rules: [formRules.required],
          value: form?.request.phone,
          fullWidth: true
        },
      }, {
        type: "text",
        cols: 6,
        props: {
          name: "email",
          label: "EMail",
          rules: [formRules.required],
          value: form?.request.email,
          fullWidth: true
        }
      }]
    }
  ]}/>;
}

UserInfo.propTypes = {
  form: proptypes.shape({
    request: proptypes.object,
    passportData: proptypes.object
  })
};

function updateName(form, setNames, dispatch) {
  const director = form?.request.companyInfo.director;
  const identity = form?.passportData.pinfl;
  const callback = value => setNames(formatName(value.Name));

  if (identity) getInfo(dispatch, identity, callback);

  setNames(formatName(director));
}

function formatName(str) {
  if(str) {
    const [...names] = str.split(" ");

    return {
      name: names[0],
      lastname: names[1],
      surname: names[3] ? names[2] + names[3] : names[2]
    };
  }
  return {
    name: "",
    lastname: "",
    surname: "",
  };
}
