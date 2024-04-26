import { Dialog } from "@capacitor/dialog";
export const dialog = async (title: string, message: string) => {
    try {
        await Dialog.alert({
            title: title,
            message: message,
        });
        return true;
    } catch (error) {
        return error;
    }
};
