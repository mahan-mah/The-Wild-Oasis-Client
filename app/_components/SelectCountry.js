import { getCountries } from "@/app/_lib/data-service";

// Let's imagine your colleague already built this component 😃

async function SelectCountry({ defaultCountry = "", name, id, className }) {
  const countries = await getCountries();
  const flag =
    countries.data.objects.find(
      (country) => country.names.common === defaultCountry,
    )?.flag ?? "";
  return (
    <>
      <select
        name={name}
        id={id}
        defaultValue={`${defaultCountry}%${flag}`}
        className={className}
      >
        <option value="">
          {defaultCountry ? defaultCountry : "Select country..."}
        </option>
        {countries.data.objects.map((c) => (
          <option
            key={c.names.common}
            value={`${c.names.common}%${c.flag.url_png}`}
          >
            {c.names.common}
          </option>
        ))}
      </select>
    </>
  );
}

export default SelectCountry;
