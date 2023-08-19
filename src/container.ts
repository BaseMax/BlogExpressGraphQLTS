import { container } from "tsyringe";

function assertString(s: string | undefined): string {
    if (!s) {
        throw new Error("expected string");
    }
    return s;
}
export { container } from "tsyringe";