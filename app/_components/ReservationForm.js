"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { createBookingAction } from "../_lib/actions";
import { useReservationContext } from "./ReservationContext";
import { differenceInDays } from "date-fns";
import { revalidatePath } from "next/cache";
import SubmitForm from "./SubmitForm";
function ReservationForm({ maxCapacity, user, cabin }) {
  const { range, resetRange } = useReservationContext();
  const cabinId = usePathname().split("/")[2];
  const { regularPrice, discount } = cabin;
  const startDate = range.from;
  const endDate = range.to;
  const numNights = differenceInDays(startDate, endDate);
  const cabinPrice = numNights * (regularPrice - discount);
  const bookingData = {
    numNights,
    startDate,
    endDate,
    cabinId,
    cabinPrice,
  };
  const createBookingWithData = createBookingAction.bind(null, bookingData);
  return (
    <div className="scale-[1.01] ">
      <div className="bg-primary-800  text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as {user.name}</p>

        <div className="flex relative gap-4 items-center">
          <div className="relative w-8 h-8">
            <Image
              // Important to display google profile images
              referrerPolicy="no-referrer"
              className="rounded-full"
              fill
              src={user.image}
              alt={user.name}
            />
          </div>
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 h-[94.5%] py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
            defaultValue={maxCapacity}
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitForm text="Reserve now" />
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
