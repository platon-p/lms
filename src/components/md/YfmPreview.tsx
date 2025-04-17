import { transform as latexTransform } from "@diplodoc/latex-extension";
import transform from "@diplodoc/transform";
import transformDefaultPlugins from "@diplodoc/transform/lib/plugins";
import { OptionsType as TransformOptions } from "@diplodoc/transform/lib/typings";
import { YfmStaticView } from "@gravity-ui/markdown-editor";
import { debounce } from "@gravity-ui/markdown-editor/_/lodash.js";
import { withLatex } from "@gravity-ui/markdown-editor/view/hocs/withLatex/index.js";
import { useEffect, useMemo, useRef, useState } from "react";

function getTransformConfig(): TransformOptions {
  return {
    plugins: [
      ...transformDefaultPlugins,
      latexTransform({ bundle: false, validate: true, runtime: "latex" }),
    ],
  };
}

const config = getTransformConfig();
const YfmViewer = withLatex({ runtime: "latex" })(YfmStaticView);

export default function YfmPreview(props: { value: string }) {
  const [html, setHtml] = useState<string>("");
  const [meta, setMeta] = useState<object | undefined>();
  const divRef = useRef<HTMLDivElement>(null);
  const render = useMemo(
    () =>
      debounce(() => {
        const res = transform(props.value, config).result;
        setHtml(res.html);
        setMeta(res.meta);
      }),
    [props],
  );
  useEffect(() => {
    render();
  }, [render]);

  return <YfmViewer html={html} ref={divRef} meta={meta} />;
}
