export function* range(a, b, step) {
    switch (arguments.length) {
        case 1:
            b = Number(a);
            a = 0;
            step = 1;
            break;
        case 2:
            a = Number(a);
            b = Number(b);
            step = a < b ? +1 : -1;
            break;
        case 3:
            a = Number(a);
            b = Number(b);
            step = Number(step);
            break;
        default:
            return;
    }

    if (Number.isNaN(a) || Number.isNaN(b) || Number.isNaN(step))
        return;

    if (a === b || !step)
        return;

    if (a < b) {
        if (step < 0)
            return;
        while (a < b) {
            yield a;
            a += step;
        }
    }

    if (a > b) {
        if (step > 0)
            return;
        while (a > b) {
            yield a;
            a += step;
        }
    }
}