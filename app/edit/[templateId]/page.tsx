import { notFound } from "next/navigation";
import { buildTemplateStaticParams, getTemplateById } from "@/lib/templates";
import { EditClient } from "@/components/EditClient";

type Props = { params: Promise<{ templateId: string }> };

export function generateStaticParams() {
  return buildTemplateStaticParams();
}

export default async function EditPage({ params }: Props) {
  const { templateId } = await params;
  const template = getTemplateById(templateId);
  if (!template) notFound();

  return <EditClient template={template} />;
}
