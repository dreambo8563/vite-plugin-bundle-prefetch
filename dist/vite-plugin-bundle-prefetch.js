const o = (s) => {
  let d;
  return {
    name: "vite-plugin-bundle-prefetch",
    apply: "build",
    configResolved(n) {
      d = n;
    },
    transformIndexHtml(n, r) {
      var l;
      const t = Object.keys(r.bundle ?? {});
      if (t.some((e) => e.includes("legacy")))
        return n;
      let a = t.filter(
        (e) => e.endsWith(".map") === !1
      );
      const c = s == null ? void 0 : s.excludeFn;
      c && (a = a.filter((e) => !c(e)));
      const f = a.filter((e) => n.includes(e) === !1).map((e) => `<link rel="prefetch" href="${d.base}${e}">`).join(""), u = `${((l = n.match(/<head>([\s\S]*)<\/head>/)) == null ? void 0 : l[1]) ?? ""}${f}`;
      return n = n.replace(
        /<head>([\s\S]*)<\/head>/,
        `<head>${u}</head>`
      ), n;
    }
  };
};
export {
  o as default
};
