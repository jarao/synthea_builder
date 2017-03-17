require 'securerandom'
require "base64"

class ModulesController < ApplicationController
  respond_to :json, except: [:index]
  respond_to :html, only: [:index]

  def index
    synthea_jsons = File.join(Rails.root, CONFIG['synthea_dir'], 'lib', 'generic', 'modules', '*.json')
    @files = (Dir.glob(synthea_jsons) - ['.', '..', '.keep', '.DS_Store']).map { |f| File.basename(f) }
  end

  def new
  end

  def create
    id = SecureRandom.uuid
    module_hash = 
      case params[:module]
      when ActionController::Parameters
        params[:module].to_h
      when String
        JSON.parse(params[:module])
      end

    module_content = JSON.pretty_unparse(module_hash)

    outfile = File.join(Rails.root, CONFIG['synthea_dir'], 'lib', 'generic', 'modules', params[:filename])

    outfile = outfile + '.json' unless outfile.end_with?('.json')

    File.open(outfile, 'w') do |f|
      f.puts module_content
    end

    Synthea::MODULES[id] = module_hash
    begin
      context = Synthea::Generic::Context.new(id)
      errors = context.validate
      if errors.empty?
        gviz_file = Synthea::Tasks::Graphviz.generate_workflow_based_graph(Dir.tmpdir, JSON.unparse(module_hash))
        gviz_base64 = Base64.encode64(  File.read( File.join(Dir.tmpdir, gviz_file) )  )
      end
    rescue => e
      errors = [e.message]
    end
    
    render json: { "errors" => errors, 'graphviz' => gviz_base64 }
  end

  def edit
  end

  def update
  end

  def show
    synthea_dir = File.join(Rails.root, CONFIG['synthea_dir'], 'lib', 'generic', 'modules')
    render json: File.read(File.join(synthea_dir, params[:id] + '.' + params[:format]))
  end
end
