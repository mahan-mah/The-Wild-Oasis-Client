"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  deleteBooking,
  getCabin,
  updateBooking,
  updateGuest,
} from "./data-service";
import { redirect } from "next/navigation";

export async function updateProfile(user, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const regex = /^[a-zA-Z0-9]{6,12}$/;
  const dataToUpdate = Object.fromEntries(formData);
  const { nationalID } = dataToUpdate;
  const [nationality, countryFlag] = dataToUpdate.nationality.split("%");
  if (!regex.test(nationalID))
    throw new Error("Please provide a valid national ID");
  await updateGuest(user.guestId, {
    nationality,
    nationalID,
    countryFlag,
  });
  revalidatePath("/account/profile");
}
export async function createBookingAction(bookingData, formData) {
  console.log(bookingData);
  console.log(formData);
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const { numGuests, observations } = Object.fromEntries(formData);
  const {
    numNights,
    startDate: startDateInForm,
    endDate: endDateinForm,
    cabinId,
    cabinPrice,
  } = bookingData;
  console.log(startDateInForm, endDateinForm);
  const startDate = String(startDateInForm).split(" ").slice(0, 5);
  const endDate = String(endDateinForm).split(" ").slice(0, 5);
  const extrasPrice = 0;
  const updatedData = {
    numGuests: Number(numGuests),
    observations: observations.slice(0, 1000),
    startDate,
    endDate,
    numNights: Math.abs(+numNights),
    cabinPrice: Math.abs(+cabinPrice),
    isPaid: false,
    cabinId,
    hasBreakfast: false,
    extrasPrice,
    status: "unconfirmed",
    totalPrice: Math.abs(Number(cabinPrice)),
    guestId: session.user.guestId,
  };
  console.log(`/cabins/${cabinId}`);
  await createBooking(updatedData);
  revalidatePath(`/cabins/${cabinId}`);
  revalidatePath("/account/reservations");
  redirect("/cabins/thankyou");
}
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
  console.log(await signIn("google", { redirectTo: "/account" }));
}
export async function deleteBookingAction(id) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  await deleteBooking(id);
  revalidatePath("/account/reservations");
}
export async function updateBookingAction(dataForm) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const { numGuests, observations, bookingId } = Object.fromEntries(dataForm);
  await updateBooking(Number(bookingId), {
    numGuests: Number(numGuests),
    observations: observations.slice(0, 1000),
  });
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
