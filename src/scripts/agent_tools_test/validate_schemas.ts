
import fs from 'fs';
import path from 'path';

const CATALOG_PATH = '/Users/akshmnd/.gemini/antigravity/brain/0e77c61c-9be0-4139-97f1-b397f519ef3a/PARALLEL_AI_SPEC.md';

async function validateSchemas() {
    console.log('🔍 Validating OpenAPI Schemas in Catalog...\n');

    if (!fs.existsSync(CATALOG_PATH)) {
        console.error('❌ Catalog file not found!');
        process.exit(1);
    }

    const content = fs.readFileSync(CATALOG_PATH, 'utf-8');
    const jsonBlocks = content.match(/```json([\s\S]*?)```/g);

    if (!jsonBlocks) {
        console.error('❌ No JSON schemas found in catalog.');
        process.exit(1);
    }

    let passCount = 0;
    let failCount = 0;

    jsonBlocks.forEach((block, index) => {
        // Remove markdown code fences
        const rawJson = block.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            const schema = JSON.parse(rawJson);

            // Basic OpenAPI 3.1.0 Validation
            const missingFields = [];
            if (!schema.openapi) missingFields.push('openapi');
            if (!schema.info) missingFields.push('info');
            if (!schema.info?.title) missingFields.push('info.title');
            if (!schema.info?.description) missingFields.push('info.description');
            if (!schema.servers) missingFields.push('servers');
            if (!schema.paths) missingFields.push('paths');

            if (missingFields.length > 0) {
                throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
            }

            // Check for Parameter Descriptions
            if (schema.paths) {
                Object.keys(schema.paths).forEach(path => {
                    const methods = schema.paths[path];
                    Object.keys(methods).forEach(method => {
                        const operation = methods[method];
                        if (operation.parameters) {
                            operation.parameters.forEach((param: any, pIndex: number) => {
                                if (!param.description) {
                                    throw new Error(`Missing description for parameter '${param.name}' in ${method.toUpperCase()} ${path}`);
                                }
                            });
                        }

                        // Check for Request Body Property Descriptions
                        if (operation.requestBody?.content?.['application/json']?.schema?.properties) {
                            const props = operation.requestBody.content['application/json'].schema.properties;
                            Object.keys(props).forEach(propName => {
                                if (!props[propName].description) {
                                    throw new Error(`Missing description for body property '${propName}' in ${method.toUpperCase()} ${path}`);
                                }
                            });
                        }
                    });
                });
            }

            console.log(`✅ [SCHEMA ${index + 1}] ${schema.info.title} - Valid JSON & Structure`);
            passCount++;

        } catch (error: any) {
            console.error(`❌ [SCHEMA ${index + 1}] FAILED: ${error.message}`);
            // console.error(rawJson.substring(0, 100) + '...'); // Print snippet of broken json
            failCount++;
        }
    });

    console.log(`\n📊 Result: ${passCount} Passed, ${failCount} Failed`);

    if (failCount > 0) {
        process.exit(1);
    }
}

validateSchemas();
