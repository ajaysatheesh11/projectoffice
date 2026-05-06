<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class UpsertPageSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'page_content_id' => ['required', 'exists:page_contents,id'],
            'section_key' => [
                'required',
                'string',
                'max:255',
                Rule::unique('page_sections', 'section_key')
                    ->where('page_content_id', $this->input('page_content_id'))
                    ->ignore($this->route('page_section')),
            ],
            'label' => ['required', 'string', 'max:255'],
            'eyebrow' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'content' => ['nullable', 'string'],
            'items_json' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }

    public function validatedSectionData(): array
    {
        $data = $this->validated();
        $items = null;

        if (filled($data['items_json'] ?? null)) {
            $items = json_decode($data['items_json'], true);

            if (json_last_error() !== JSON_ERROR_NONE || ! is_array($items)) {
                throw ValidationException::withMessages([
                    'items_json' => 'Items JSON must be a valid JSON array.',
                ]);
            }
        }

        unset($data['items_json']);

        return [
            ...$data,
            'items' => $items,
            'sort_order' => $data['sort_order'] ?? 0,
            'is_active' => $this->boolean('is_active'),
        ];
    }
}
