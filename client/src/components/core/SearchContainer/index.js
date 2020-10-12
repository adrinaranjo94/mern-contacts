import PropTypes from "prop-types";

const SearchContainer = (props) => {
  const checkParams = () => {
    return (
      props.search &&
      (props.searchParam || props.searchParams) &&
      props.template &&
      Array.isArray(props.options)
    );
  };
  const filterOptions = () => {
    return props.options.filter((option) =>
      option[props.searchParam]
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
          props.search
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        )
    );
  };

  const filterArrayOptions = () => {
    return props.options.filter((option) => {
      let finded = false;
      props.searchParams.forEach((property) => {
        if (
          option[property]
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              props.search
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            )
        ) {
          finded = true;
        }
      });
      return finded;
    });
  };

  if (Array.isArray(props.options)) {
    if (props.options.length > 0) {
      if (props.search) {
        if (checkParams()) {
          // check is array params
          if (props.searchParams) {
            console.log(props.searchParams);
            const filteredOptions = filterArrayOptions();

            if (filteredOptions.length === 0) {
              return props.notFound();
            } else {
              return filteredOptions.map((optionFiltered, index) => {
                return props.template(optionFiltered, index);
              });
            }
          }
          // check is string param
          else {
            const filteredOptions = filterOptions();
            if (filteredOptions.length === 0) {
              return props.notFound();
            } else {
              return filteredOptions.map((optionFiltered, index) =>
                props.template(optionFiltered, index)
              );
            }
          }
        }
      } else {
        return props.options.map((option, index) =>
          props.template(option, index)
        );
      }
    } else {
      return props.empty();
    }
  }
};

SearchContainer.propTypes = {
  options: PropTypes.array.isRequired,
  search: PropTypes.string,
  searchParam: PropTypes.string,
  searchParams: PropTypes.array,
  template: PropTypes.func,
  empty: PropTypes.func,
};

export { SearchContainer };
