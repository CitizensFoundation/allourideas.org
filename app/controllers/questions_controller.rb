class QuestionsController < ApplicationController
  require 'crack'
  #caches_page :results
  # GET /questions
  # GET /questions.xml
  def index
    @questions = Question.find(:all)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @questions }
    end
  end

  # GET /questions/1
  # GET /questions/1.xml
  # def show
  #   @question = Question.find(params[:id])
  # 
  #   respond_to do |format|
  #     format.html # show.html.erb
  #     format.xml  { render :xml => @question }
  #   end
  # end
  def results
    logger.info "@question = Question.find_by_name(#{params[:id]}) ..."
    @question = Question.find_by_name(params[:id])
    logger.info "@question is #{@question.inspect}."
    @partial_results_url = "#{@question.earl}/results"
    @all_results_url = "#{@question.earl}/results?all=true"
    if params[:all]
      @choices = Choice.find(:all, :params => {:question_id => @question.id})
    else
      @choices = Choice.find(:all, :params => {:question_id => @question.id, :limit => 10, :offset => 0})
    end
    logger.info "First choice is #{@choices.first.inspect}"
  end
  
  def vote(direction = :left)
    prompt_id = session[:current_prompt_id]
    logger.info "Getting ready to vote left on Prompt #{prompt_id}, Question #{params[:id]}"
    @prompt = Prompt.find(prompt_id, :params => {:question_id => params[:id]})
    #raise Prompt.find(:all).inspect
    case direction
    when :left
      winner, loser = @prompt.left_choice_text, @prompt.right_choice_text
      conditional = p = @prompt.post(:vote_left, :params => {'auto' => request.session_options[:id]})
    when :right
      loser, winner = @prompt.left_choice_text, @prompt.right_choice_text
      conditional = p = @prompt.post(:vote_right, :params => {'auto' => request.session_options[:id]})
    else
      raise "unspecified choice"
    end
    logger.info "winnder [sic] was #{winner}, loser is #{loser}"
    logger.info "prompt was #{@prompt.inspect}"
    respond_to do |format|
        flash[:notice] = 'Vote was successfully counted.'
        format.xml  {  head :ok }
        format.js  { 
          if conditional
            newprompt = Crack::XML.parse(p.body)['prompt']
            @newprompt = Question.find(params[:id])
            render :json => {:votes => 20, :newleft => newprompt['left_choice_text'], 
                             :newright => newprompt['right_choice_text']
                             }.to_json
          else
            render :json => '{"error" : "Vote failed"}'
          end
          }
      end
  end
  
  def vote_left
    vote(:left)
  end
  
  def vote_right
    vote(:right)
  end
  
  # def vote_left
  #   prompt_id = session[:current_prompt_id]
  #   logger.info "Getting ready to vote left on Prompt #{prompt_id}, Question #{params[:id]}"
  #    #@question = Question.find_by_name(params[:id])
  #   @prompt = Prompt.find(prompt_id, :params => {:question_id => params[:id]})
  #   #raise Prompt.find(:all).inspect
  #   winner, loser = @prompt.left_choice_text, @prompt.right_choice_text
  #   logger.info "winnder [sic] was #{winner}, loser is #{loser}"
  #   logger.info "prompt was #{@prompt.inspect}"
  #   respond_to do |format|
  #       flash[:notice] = 'Vote was successfully counted.'
  #       format.xml  {  head :ok }
  #       format.js  { 
  #         if p = @prompt.post(:vote_left, :params => {'auto' => request.session_options[:id]})
  #           newprompt = Crack::XML.parse(p.body)['prompt']
  #           @newprompt = Question.find(params[:id])
  #           render :json => {:votes => 20, :newleft => newprompt['left_choice_text'], 
  #                            :newright => newprompt['right_choice_text']
  #                            }.to_json
  #         else
  #           render :json => '{"error" : "Vote failed"}'
  #         end
  #         }
  #     end
  #   end
  #   
  #   def vote_right
  #     prompt_id = session[:current_prompt_id]
  #     logger.info "Getting ready to vote left on Prompt #{prompt_id}, Question #{params[:id]}"
  #      #@question = Question.find_by_name(params[:id])
  #     @prompt = Prompt.find(prompt_id, :params => {:question_id => params[:id]})
  #     #raise Prompt.find(:all).inspect
  #     loser, winner = @prompt.left_choice_text, @prompt.right_choice_text
  #     respond_to do |format|
  #         flash[:notice] = 'Vote was successfully counted.'
  #         format.xml  {  head :ok }
  #         format.js  { 
  #           if p = @prompt.post(:vote_left, :params => {'auto' => request.session_options[:id]})
  #             newprompt = Crack::XML.parse(p.body)['prompt']
  #             @newprompt = Question.find(params[:id])
  #             render :json => {:votes => 20, :newleft => newprompt['left_choice_text'], 
  #                              :newright => newprompt['right_choice_text']
  #                              }.to_json
  #           else
  #             render :json => '{"error" : "Vote failed"}'
  #           end
  #           }
  #       end
  #     end
    
    def skip
      prompt_id = session[:current_prompt_id]
      logger.info "Getting ready to skip out on Prompt #{prompt_id}, Question #{params[:id]}"
      @prompt = Prompt.find(prompt_id, :params => {:question_id => params[:id]})
      #raise Prompt.find(:all).inspect
      respond_to do |format|
          flash[:notice] = 'You just skipped.'
          format.xml  {  head :ok }
          format.js  { 
            if p = @prompt.post(:skip, :params => {'auto' => request.session_options[:id]})
              newprompt = Crack::XML.parse(p.body)['prompt']
              @newprompt = Question.find(params[:id])
              render :json => {:votes => 20, :newleft => newprompt['left_choice_text'], :newright => newprompt['right_choice_text']}.to_json
            else
              render :json => '{"error" : "Skip failed"}'
            end
            }
        end
      end

      def add_idea
        prompt_id = session[:current_prompt_id]
        logger.info "Getting ready to skip out on Prompt #{prompt_id}, Question #{params[:id]}"
        new_idea_data = params[:new_idea]
        @prompt = Prompt.find(prompt_id, :params => {:question_id => params[:id]})
        #:params => {:question_id => params[:id]}
        @choice = Choice.new(:data => new_idea_data)
        #raise Prompt.find(:all).inspect
        respond_to do |format|
            flash[:notice] = 'You just added an idea for people to vote on.'
            format.xml  {  head :ok }
            format.js  { 
              if p = Choice.post(:create_from_abroad, :question_id => params[:id], :params => {'auto' => request.session_options[:id], :data => new_idea_data, :question_id => params[:id]})
                newprompt = Crack::XML.parse(p.body)['prompt']
                puts newprompt.inspect
                @newprompt = Question.find(params[:id])
                render :json => {:votes => 20, :newleft => newprompt['left_choice_text'], :newright => newprompt['right_choice_text'], 
                                 :message => "You just added an idea for people to vote on: #{new_idea_data}"}.to_json
                ::IdeaMailer.deliver_notification @newprompt.creator, @newprompt, params[:id], new_idea_data, newprompt['saved_choice_id'] #spike
                #notification(user, question, question_id, choice, choice_id)
              else
                render :json => '{"error" : "Addition of new idea failed"}'
              end
              }
          end
        end


  # GET /questions/new
  # GET /questions/new.xml
  def new
    if signed_in?
      @registered = true
    else
      auto_create_user!
    end
    # 
    # 
    # 
    # 
    # #ok.  we need to query the Pairwise API to find out if the current user is actually registered.
    # #If so, no need to show username and password fields
    # #If not, show the fields
    # auto_create_user!
    # sid = request.session_options[:id]
    # begin
    #   u = RemoteUser.find_by_sid(sid)
    #   #@registered = u.email_confirmed
    #   @registered = signed_in?
    # rescue
    #   u = RemoteUser.auto_create_user_object_from_sid(sid)
    # end
    
    @question = Question.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @question }
    end
  end

  # GET /questions/1/edit
  def edit
    #@question = Question.find(params[:id])
  end

  # POST /questions
  # POST /questions.xml
  def create
    unless signed_in?
      #try to register the user before adding the question
      @user = ::User.new(:email => params[:question]['email'], 
                         :password => params[:question]['password'], 
                         :password_confirmation => params[:question]['password'])
      if @user.save
        sign_in(@user)
        #now create the user in the remote system
        @user.remote_user(request.session_options[:id])
        ::ClearanceMailer.deliver_confirmation @user
      else
        flash[:notice] = "Sorry, we couldn't register you."
        render :template => 'users/new' and return
      end
    end
    #at this point you have a current_user.  if you didn't, we would have redirected back with a validation error.
    
    #tell the remote server that the creator is the associated remote user
    # @question = Question.new(params[:question].except('url').merge({'auto' => request.session_options[:id]}))
    @question = Question.new(params[:question].except('url').merge({'creator_id' => current_user.remote_user(request.session_options[:id]).id}))
    respond_to do |format|
      if @question.save
        earl = Earl.create(:question_id => @question.id, :name => params[:question]['url'])
        logger.info "Question was successfully created."
        flash[:notice] = 'Question was successfully created.'
        format.html { redirect_to(@question.earl) }
        format.xml  { render :xml => @question, :status => :created, :location => @question }
      else
        logger.info "Question was not successfully created."
        format.html { render :action => "new" }
        format.xml  { render :xml => @question.errors, :status => :unprocessable_entity }
      end
    end
  end

  # # PUT /questions/1
  # # PUT /questions/1.xml
  # def update
  #   @question = Question.find_by_name(params[:id])
  # 
  #   respond_to do |format|
  #     if @question.update_attributes(params[:question])
  #       flash[:notice] = 'Question was successfully updated.'
  #       format.html { redirect_to(@question) }
  #       format.xml  { head :ok }
  #     else
  #       format.html { render :action => "edit" }
  #       format.xml  { render :xml => @question.errors, :status => :unprocessable_entity }
  #     end
  #   end
  # end
  # 
  # # DELETE /questions/1
  # # DELETE /questions/1.xml
  # def destroy
  #    @question = Question.find_by_name(params[:id])
  #   @question.destroy
  # 
  #   respond_to do |format|
  #     format.html { redirect_to(questions_url) }
  #     format.xml  { head :ok }
  #   end
  # end
end
