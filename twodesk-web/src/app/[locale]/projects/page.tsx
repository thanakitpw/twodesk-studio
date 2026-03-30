import { supabaseAdmin } from '@/lib/supabase/admin';
import { projects as fallbackProjects } from '@/lib/data';
import ProjectsContent, { type ProjectItem } from './ProjectsContent';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;

  let projectItems: ProjectItem[];

  try {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .order('sort_order');

    if (error || !data || data.length === 0) {
      // Fallback to static data
      projectItems = fallbackProjects.map((p) => ({
        id: p.id,
        title: p.title,
        category: p.category,
        location: p.location,
        year: p.year,
        area: p.area,
        description: p.description,
        image: p.image,
        images: p.images,
        imageGroups: p.imageGroups,
      }));
    } else {
      projectItems = data.map((p) => ({
        id: p.slug,
        title: locale === 'th' ? p.title_th : p.title_en,
        category: p.category,
        location: locale === 'th' ? p.location_th : p.location_en,
        year: String(p.year),
        area: p.area_sqm ? `${p.area_sqm} sq.m.` : undefined,
        description: locale === 'th' ? p.description_th : p.description_en,
        image: p.cover_image,
        images: p.images ?? [],
        imageGroups: p.image_groups ?? [],
      }));
    }
  } catch {
    // Fallback to static data on any error
    projectItems = fallbackProjects.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      location: p.location,
      year: p.year,
      area: p.area,
      description: p.description,
      image: p.image,
      images: p.images,
      imageGroups: p.imageGroups,
    }));
  }

  return <ProjectsContent projects={projectItems} />;
}
