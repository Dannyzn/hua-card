import { notFound } from "next/navigation";
import { getTemplateById } from "@/lib/templates";
import { EditClient } from "@/components/EditClient";

type Props = { params: Promise<{ templateId: string }> };

export default async function EditPage({ params }: Props) {
  const { templateId } = await params;
  const template = getTemplateById(templateId);
  if (!template) notFound();

  return <EditClient template={template} />;
}
