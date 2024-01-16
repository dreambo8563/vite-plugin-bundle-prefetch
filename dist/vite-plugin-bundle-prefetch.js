const o = (s) => {
  let t;
  return {
    name: "vite-plugin-prefetch",
    apply: "build",
    configResolved(n) {
      t = n;
    },
    transformIndexHtml(n, r) {
      var l;
      const c = Object.keys(r.bundle ?? {});
      if (c.some((e) => e.includes("legacy")))
        return n;
      let a = c.filter(
        (e) => e.endsWith(".map") === !1
      );
      const d = s == null ? void 0 : s.excludeFn;
      d && (a = a.filter((e) => !d(e)));
      const f = a.filter((e) => n.includes(e) === !1).map((e) => `<link rel="prefetch" href="${t.base}${e}">`).join(""), i = `${((l = n.match(/<head>([\s\S]*)<\/head>/)) == null ? void 0 : l[1]) ?? ""}${f}`;
      return n = n.replace(
        /<head>([\s\S]*)<\/head>/,
        `<head>${i}</head>`
      ), n;
    }
  };
};
export {
  o as default
};
